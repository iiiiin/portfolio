import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

// <table>을 스크롤 가능한 <div>로 감싸서, 좁은 화면에서 표 때문에 페이지 전체가
// 가로 스크롤되는 걸 막는다 (코드블록의 overflow-x: auto와 동일한 목적).
export function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "table" && parent && typeof index === "number") {
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: { className: ["til-table-wrap"] },
          children: [node],
        };
        parent.children[index] = wrapper;
      }
    });
  };
}
