import { Action, ActionPanel, Form, List, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { convertFromLightning } from "../lib/convert";
import validate from "../lib/validate";
import randomTimeString from "../lib/random-time-string";

function Result({
  withSeconds,
  withoutSeconds,
  lightningString,
}: {
  withSeconds: string;
  withoutSeconds: string;
  lightningString: string;
}) {
  return (
    <List navigationTitle={lightningString} searchBarPlaceholder={lightningString} enableFiltering={false}>
      <List.Item
        title={withoutSeconds}
        subtitle="no seconds"
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={withoutSeconds} />
          </ActionPanel>
        }
      />
      <List.Item
        title={withSeconds}
        subtitle="with seconds"
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={withSeconds} />
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
      const { withSeconds, withoutSeconds, lightningString } = convertFromLightning(timeString);
      push(<Result withSeconds={withSeconds} withoutSeconds={withoutSeconds} lightningString={lightningString} />);
    } else {
      const randomTime = randomTimeString();
      showToast({ style: Toast.Style.Failure, title: "Invalid time string", message: `Try ${randomTime}` });
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
      <Form.TextField id="time" title="Lightning Time" onChange={setTimeString} />
    </Form>
  );
}
