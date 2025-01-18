import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";

export const stripTags = (html: string) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "h2") {
        return (
          <h2 className="text-lg font-semibold mt-2 mb-2">
            {domToReact(domNode.children as DOMNode[], options)}
          </h2>
        );
      }
      if (domNode.type === "tag" && domNode.name === "h3") {
        return (
          <h3 className="text-md font-semibold mt-2 mb-2">
            {domToReact(domNode.children as DOMNode[], options)}
          </h3>
        );
      }
      if (domNode.type === "tag" && domNode.name === "ul") {
        return (
          <ul className="list-disc pl-8 mt-2 mb-2">
            {domToReact(domNode.children as DOMNode[], options)}
          </ul>
        );
      }
      if (domNode.type === "tag" && domNode.name === "ol") {
        return (
          <ol className="list-decimal pl-8 mt-2 mb-2">
            {domToReact(domNode.children as DOMNode[], options)}
          </ol>
        );
      }
      if (
        domNode.type === "tag" &&
        (domNode.name === "p" || domNode.name === "div")
      ) {
        return (
          <span className="inline">
            {domToReact(domNode.children as DOMNode[], options)}
          </span>
        );
      }
      if (domNode.type === "tag" && domNode.name === "blockquote") {
        return (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic mt-4 mb-4">
            {domToReact(domNode.children as DOMNode[], options)}
          </blockquote>
        );
      }
      return domNode;
    },
  };

  return parse(html, options);
};
