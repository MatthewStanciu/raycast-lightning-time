import { Action, ActionPanel, Icon, List } from "@raycast/api";

function ColorListItem({ color }: { color: string }) {
  return (
    <List.Item
      title=""
      icon={{ source: Icon.CircleFilled, tintColor: { light: color, dark: color } }}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Hex Code" content={`#${color}`} />
        </ActionPanel>
      }
    />
  );
}

export default ColorListItem;
