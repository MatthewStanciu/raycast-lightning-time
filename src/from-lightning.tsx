import { Action, ActionPanel, Detail, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { convertFromLightning } from "../lib/convert";
import validate from "../lib/validate";

function Result({ timeString }: { timeString: string }) {
  return <Detail markdown={`# ${timeString}`} />;
}

export default function Command() {
  const { push } = useNavigation();
  const [timeString, setTimeString] = useState("8~0~0");

  function validateTimeString(time: string) {
    const isValid = validate(time);
    if (!isValid) {
      showToast({ style: Toast.Style.Failure, title: "Invalid time string", message: "Try 8~0~0" });
    } else {
      showToast({ title: "Looking good!" });
    }
    return isValid;
  }

  function handleSubmit() {
    const isValid = validateTimeString(timeString);
    if (isValid) {
      const convertedTime = convertFromLightning(timeString);
      push(<Result timeString={convertedTime} />);
    }
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
        <Form.TextField id="time" onChange={setTimeString} />
      </Form>
    </>
  );
}
