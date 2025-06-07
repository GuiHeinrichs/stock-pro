import { NoticeType } from "antd/es/message/interface";

export interface ValidityMessage {
  type: NoticeType;
  content: string;
  className?: string;
}
