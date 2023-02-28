import { FieldType } from "@types/field-types";

export interface IBaseEditorProps {
    datasheetId: string;
    width: number;
    height: number;
    field: {type: FieldType, property: any};
    disabled?: boolean;
    onSave?: (val: any, alarm?: any) => void;
    onChange?: (val: any) => void;
  }