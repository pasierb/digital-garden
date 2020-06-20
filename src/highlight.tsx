import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import yaml from 'highlight.js/lib/languages/yaml';
import go from 'highlight.js/lib/languages/go';

import 'highlight.js/styles/dracula.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('go', go);

export { hljs };
