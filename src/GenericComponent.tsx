import React from 'react'

export type WithId = 'withId';
export type WithoutId = 'withoutId';

interface IOption {
  id: string;
  label: string;
  value: string;
}

interface IOptionWithoutId extends IOption {
  cb: () => void;
}

interface IOptionWithId extends IOption {
  cb: (id: string) => void;
}

interface PropsWithId {
  id: string;
  options: IOptionWithId[];
}

interface PropsWithoutId {
  id?: null;
  options: IOptionWithoutId[];
}

type Props<T> = T extends WithId
  ? PropsWithId
  : PropsWithoutId;

const isWithId = (props: PropsWithId | PropsWithoutId): props is PropsWithId => {
  console.log('isWithId')
  return props.id !== null;
};
  
export default function GenericComponent<T,>(props: Props<T>) {
  const { options } = props;

  return <div>
    <ul>
      {isWithId(props) ? options.map((option) => (
        <li key={option.id} onClick={() => option.cb(props.id)}>
          {option.label}
        </li>
      ))
      : options.map((option) => (
        <li key={option.id} onClick={() => option.cb}>
          {option.label}
        </li>
      ))}
    </ul>
  </div>
}