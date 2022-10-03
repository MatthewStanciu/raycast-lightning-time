import { Form, ActionPanel, Action, popToRoot, useNavigation, List, Icon } from "@raycast/api";
import { convertToLightning } from "../lib/convert";
import getColors from "../lib/colors";

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
      <List.Item title="" icon={{ source: Icon.CircleFilled, tintColor: { light: boltColor, dark: boltColor } }} />
      <List.Item title="" icon={{ source: Icon.CircleFilled, tintColor: { light: zapColor, dark: zapColor } }} />
      <List.Item title="" icon={{ source: Icon.CircleFilled, tintColor: { light: sparkColor, dark: sparkColor } }} />
    </List>
  );
}
