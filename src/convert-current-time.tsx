import { ActionPanel, Action, List } from "@raycast/api";
import { convertToLightning } from "../lib/convert";
import getColors from "../lib/colors";
import ColorListItem from "./components/color-list-item";

export default function Command() {
  const time = new Date();
  const { lightningString, originalTimeString } = convertToLightning(time);
  return <Result lightningString={lightningString} originalTimeString={originalTimeString} />;
}

function Result({ lightningString, originalTimeString }: { lightningString: string; originalTimeString: string }) {
  const { boltColor, zapColor, sparkColor } = getColors(lightningString);
  return (
    <List navigationTitle={originalTimeString} searchBarPlaceholder={originalTimeString} enableFiltering={false}>
      <List.Item
        title={lightningString}
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={lightningString} />
          </ActionPanel>
        }
      />
      <ColorListItem color={boltColor} />
      <ColorListItem color={zapColor} />
      <ColorListItem color={sparkColor} />
    </List>
  );
}
