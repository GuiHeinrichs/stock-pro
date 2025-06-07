import { MessageInstance } from "antd/es/message/interface";
import { ValidityMessage } from "@/types/ValidityMessage";

export function ValidityMessageValidation(
  data: ValidityMessage,
  messageApi: MessageInstance
) {
  messageApi.open({
    type: data.type,
    content: data.content,
    className: data.className,
  });
}
