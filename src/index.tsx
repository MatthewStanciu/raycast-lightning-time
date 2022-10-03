import { Form, ActionPanel, Action, showToast, popToRoot, Detail, useNavigation } from "@raycast/api";
import convert from "../lib/convert";

type Values = {
  textfield: string;
  textarea: string;
  datepicker: Date;
  checkbox: boolean;
  dropdown: string;
  tokeneditor: string[];
};

function Result({ timeString }: { timeString: string }) {
  return <Detail markdown={`# ${timeString}`} />;
}

export default function Command() {
  const { push } = useNavigation();

  function handleSubmit(values: Values) {
    const time = values.datepicker;
    if (!time) {
      return popToRoot();
    }
    const convertedTime = convert(time);
    push(<Result timeString={convertedTime} />);
  }

  return (
    <>
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm title="Convert" onSubmit={handleSubmit} />
          </ActionPanel>
        }
      >
        <Form.DatePicker id="datepicker" title="Boring time" />
      </Form>
    </>
  );
}
