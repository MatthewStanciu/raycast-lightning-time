import { Action, ActionPanel, Form, List, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { convertFromLightning } from "../lib/convert";
import validate from "../lib/validate";

function Result({ timeString }: { timeString: { withSeconds: string; withoutSeconds: string } }) {
  const { withSeconds, withoutSeconds } = timeString;
  return (
    <List>
      <List.Item
        title={withSeconds}
        subtitle="With seconds"
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={withSeconds} />
          </ActionPanel>
        }
      />
      <List.Item
        title={withoutSeconds}
        subtitle="Without seconds"
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={withoutSeconds} />
          </ActionPanel>
        }
      />
    </List>
  );
}

export default function Command() {
  const { push } = useNavigation();
  const [timeString, setTimeString] = useState("");

  function handleSubmit() {
    const isValid = validate(timeString);
    if (isValid) {
      const convertedTime = convertFromLightning(timeString);
      push(<Result timeString={convertedTime} />);
    } else {
      showToast({ style: Toast.Style.Failure, title: "Invalid time string", message: "Try 8~0~0" });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Convert" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="time" title="Lightning Time string" onChange={setTimeString} />
    </Form>
  );
}
