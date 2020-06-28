const interpolationTags = ['${', '}'];

function compile(str: string, values: {[key: string]: any}): string {
  let p = 0;
  let i = str.indexOf(interpolationTags[0], p);
  let result = [];

  while(i >= 0) {
    const j = str.indexOf(interpolationTags[1], i+2);

    if (j === -1) {
      throw new Error('Closing extrapolation tag missing');
    }

    const key = str.substring(i+interpolationTags[0].length, j);

    result.push(str.substring(p, i), encodeURIComponent(values[key]));

    p = j+1;
    i = str.indexOf(interpolationTags[0], p);
  }

  result.push(str.substring(p));

  return result.join('');
}

export function factory(config: {[key: string]: string}) {
  return function getImageUrl(frontmatter: {[key: string]: any}): string {
    const { stencilbot } = frontmatter;

    const template = config[stencilbot] || '';

    return compile(template, frontmatter);
  }
}