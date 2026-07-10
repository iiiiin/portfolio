import { visit } from "unist-util-visit";
import type { Root } from "mdast";

// ```mermaid 코드블록을 <Mermaid chart="..." /> MDX 컴포넌트로 치환
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: any, index, parent: any) => {
      if (node.lang === "mermaid" && parent && typeof index === "number") {
        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "Mermaid",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "chart",
              value: node.value,
            },
          ],
          children: [],
        };
      }
    });
  };
}