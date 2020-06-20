import React, { FC, useState, useEffect, createContext } from 'react';
import { Index } from 'elasticlunr';
import { Link, StaticQuery, graphql } from "gatsby"
import { Dialog } from '@reach/dialog';

interface SearchProps {
  searchIndex: any
  onClose: () => void
  isOpen: boolean
}

interface SearchDocument {
  id: string
  title: string
  slug: string
  summary?: string
  tags?: string[]
}

interface SearchContextValue {
  searchIndex: any
  open: () => void
  close: () => void
}

interface SearchProviderProps {
}

const Search: FC<SearchProps> = ({ searchIndex, isOpen, onClose }) => {
  const [index, setIndex] = useState<Index<SearchDocument>>();
  const [results, setResults] = useState<SearchDocument[]>([])

  useEffect(() => {
    const i = Index.load<SearchDocument>(searchIndex);

    setIndex(i);
  }, []);

  const handleSearch = (query: string) => {
    const r = index.search(query, {
      fields: {
        title: { expand: true },
        summary: { expand: true },
        tags: { expand: true }
      }
    }).map(({ ref }) => index.documentStore.getDoc(ref));

    setResults(r);
  }

  return (
    <Dialog isOpen={isOpen} onDismiss={() => onClose()}>
      <button onClick={() => onClose()} className="pure-button button-small button-secondary dialog-close">✖️</button>

      <h3>Search</h3>

      <form className="pure-form pure-g">
        <input onChange={e => handleSearch(e.target.value)} className="pure-input pure-u-1" />
      </form>

      <ul>
        {results.map(doc => (
          <li key={doc.id}>
            <Link to={doc.slug}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}

export const SearchContext = createContext<SearchContextValue>({
  searchIndex: null,
  open: () => {},
  close: () => {}
});

export const SearchConsumer = SearchContext.Consumer;

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          siteSearchIndex {
            index
          }
        }
      `}
      render={data => {
        const searchIndex = data.siteSearchIndex.index;

        return (
          <SearchContext.Provider value={{
            searchIndex,
            open: handleOpen,
            close: handleClose
          }}>
            {children}
            <Search searchIndex={searchIndex} onClose={handleClose} isOpen={isOpen} />
          </SearchContext.Provider>
        );
      }}
    />
  );
}

export default Search;
