import React from 'react';

const Svg = () => {
  const svgMarkup = `<CONTENT OF SVG FILE>`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="301px" />;

  return <SvgImage />;
};

export default Svg;
