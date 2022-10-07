import { Action, ActionPanel, Form, List, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { convertFromLightning } from "../lib/convert";
import normalize from "../lib/normalize";
import randomTimeString from "../lib/random-time-string";

export default function Command() {
  const { push } = useNavigation();
  const [timeString, setTimeString] = useState("");
  const [randomTime] = useState(randomTimeString());

  function handleSubmit() {
    const { isValid, normalizedLightningString } = normalize(timeString);
    if (isValid) {
      const { withSeconds, withoutSeconds, lightningString } = convertFromLightning(normalizedLightningString);
      push(<Result withSeconds={withSeconds} withoutSeconds={withoutSeconds} lightningString={lightningString} />);
    } else {
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
      <Form.TextField id="time" title="Lightning Time" placeholder={randomTime} onChange={setTimeString} />
    </Form>
  );
}

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
    <List searchBarPlaceholder={lightningString} enableFiltering={false}>
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
