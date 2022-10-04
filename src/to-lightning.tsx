import { Form, ActionPanel, Action, popToRoot, useNavigation, List } from "@raycast/api";
import { convertToLightning } from "../lib/convert";
import getColors from "../lib/colors";
import ColorListItem from "./components/color-list-item";

type Values = {
  textfield: string;
  textarea: string;
  datepicker: Date;
  checkbox: boolean;
  dropdown: string;
  tokeneditor: string[];
};

export default function Command() {
  const { push } = useNavigation();

  function handleSubmit(values: Values) {
    const time = values.datepicker;
    if (!time) {
      return popToRoot();
    }
    const { lightningString, originalTimeString } = convertToLightning(time);
    push(<Result lightningString={lightningString} originalTimeString={originalTimeString} />);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Convert" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="datepicker" title="Time" />
    </Form>
  );
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
