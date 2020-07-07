import styled from "styled-components";
import { LabelInput } from "../Layout/LabelInput";
import { NumberInput } from "../Layout/NumberInput";
import { Button } from "../Layout/Button";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 60%;
  height: 100%;
  justify-content: space-evenly;
  padding: 12px;
  overflow: auto;
`;

interface KeyResultFormProps {
  id?: string;
  title: string;
  description: string;
  target: number;
  current?: number;
  createdAt?: string;
  updateLoading: boolean;
  setTitle: (title: string) => void;
  setDescription: (descr: string) => void;
  setTarget: (target: number) => void;
  setCurrent?: (curr: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitText: string;
  createMode?: boolean;
}

export const KeyResultForm: React.FC<KeyResultFormProps> = ({
  id,
  title,
  description,
  createdAt,
  target,
  current,
  setTarget,
  setCurrent,
  setTitle,
  setDescription,
  updateLoading,
  onSubmit,
  onBack,
  submitText,
  createMode = false,
}) => {
  return (
    <FormWrapper>
      {!createMode && (
        <LabelInput disabled label="Id" value={id} onChange={() => {}} />
      )}
      <LabelInput
        label="Title"
        value={title ?? ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <LabelInput
        label="Description"
        value={description ?? ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!createMode && (
        <NumberInput
          label="Current"
          value={(current ?? 0).toString()}
          onChange={(val: string) => {
            const num = val || current.toString();
            setCurrent(parseInt(num));
          }}
        />
      )}
      <NumberInput
        label="Target"
        value={(target ?? 0).toString()}
        onChange={(val: string) => {
          const num = val || target.toString();
          setTarget(parseInt(num));
        }}
      />
      {!createMode && (
        <LabelInput
          label="Created At"
          disabled
          value={createdAt}
          onChange={() => {}}
        />
      )}
      {updateLoading ? (
        "Loading"
      ) : (
        <Button onClick={onSubmit}>{submitText}</Button>
      )}
      <Button onClick={onBack} secondary>
        Back
      </Button>
    </FormWrapper>
  );
};
