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

function Result({ timeString }: { timeString: string }) {
  const { boltColor, zapColor, sparkColor } = getColors(timeString);
  return (
    <List>
      <List.Item
        title={timeString}
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={timeString} />
          </ActionPanel>
        }
      />
      <List.Item title="" icon={{ source: Icon.CircleFilled, tintColor: { light: boltColor, dark: boltColor } }} />
      <List.Item title="" icon={{ source: Icon.CircleFilled, tintColor: { light: zapColor, dark: zapColor } }} />
      <List.Item title="" icon={{ source: Icon.CircleFilled, tintColor: { light: sparkColor, dark: sparkColor } }} />
    </List>
  );
}

export default function Command() {
  const { push } = useNavigation();

  function handleSubmit(values: Values) {
    const time = values.datepicker;
    if (!time) {
      return popToRoot();
    }
    const convertedTime = convertToLightning(time);
    push(<Result timeString={convertedTime} />);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Convert" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="datepicker" title="Boring time" />
    </Form>
  );
}
