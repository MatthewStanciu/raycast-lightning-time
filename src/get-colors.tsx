import { Form, ActionPanel, Action, useNavigation, List, showToast, Toast } from "@raycast/api";
import getColors from "../lib/colors";
import ColorListItem from "./components/color-list-item";
import { useState } from "react";
import validate from "../lib/validate";
import randomTimeString from "../lib/random-time-string";

export default function Command() {
  const { push } = useNavigation();
  const [timeString, setTimeString] = useState("");
  const [randomTime] = useState(randomTimeString());

  function handleSubmit() {
    const isValid = validate(timeString);
    if (isValid) {
      const { boltColor, zapColor, sparkColor } = getColors(timeString);
      push(<Result lightningString={timeString} boltColor={boltColor} zapColor={zapColor} sparkColor={sparkColor} />);
    } else {
      showToast({ style: Toast.Style.Failure, title: "Invalid time string", message: `Try ${randomTime}` });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Get Colors" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="time" title="Lightning Time" placeholder={randomTime} onChange={setTimeString} />
    </Form>
  );
}

function Result({
  lightningString,
  boltColor,
  zapColor,
  sparkColor,
}: {
  lightningString: string;
  boltColor: string;
  zapColor: string;
  sparkColor: string;
}) {
  return (
    <List navigationTitle={lightningString} searchBarPlaceholder={lightningString} enableFiltering={false}>
      <ColorListItem color={boltColor} />
      <ColorListItem color={zapColor} />
      <ColorListItem color={sparkColor} />
    </List>
  );
}
