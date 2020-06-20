import React, { FC, useState, useEffect, createContext, useRef } from 'react';
import { Index } from 'elasticlunr';
import { Link, StaticQuery, graphql } from "gatsby"
import { Dialog } from '@reach/dialog';

interface SearchProps {
  searchIndex: any
  onClose: () => void
  isOpen: boolean
  defaultTerm?: string
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
  search: (term: string) => void
  isOpen: boolean
}

interface SearchProviderProps {
}

const Search: FC<SearchProps> = ({ searchIndex, isOpen, onClose, defaultTerm = '' }) => {
  const [index, setIndex] = useState<Index<SearchDocument>>();
  const [results, setResults] = useState<SearchDocument[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const i = Index.load<SearchDocument>(searchIndex);

    setIndex(i);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isOpen]);

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
      <button onClick={() => onClose()} className="pure-button button-secondary dialog-close">✖️</button>

      <h3>Search</h3>

      <form className="pure-form pure-g">
        <input
          ref={inputRef}
          defaultValue={defaultTerm}
          onChange={e => handleSearch(e.target.value)}
          className="pure-input pure-u-1"
        />
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
  close: () => {},
  search: () => {},
  isOpen: false
});

export const SearchConsumer = SearchContext.Consumer;

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSearch = (term: string) => {
    setIsOpen(true);
    setTerm(term);
  }

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
            close: handleClose,
            search: handleSearch,
            isOpen
          }}>
            {children}
            <Search
              searchIndex={searchIndex}
              onClose={handleClose}
              isOpen={isOpen}
              defaultTerm={term}
            />
          </SearchContext.Provider>
        );
      }}
    />
  );
}

export default Search;
