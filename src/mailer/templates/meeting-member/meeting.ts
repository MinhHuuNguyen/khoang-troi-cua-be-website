/* eslint-disable import/no-anonymous-default-export */
import mailTemplate from "../template";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
// TODO: Dùng sau khi xác nhận NHẬN QUA vòng đơn

export default (data: any) => {
  const formattedDateTime = format(new Date(data.date), "eeee', ngày 'dd/MM/yyyy', lúc 'HH:mm", { locale: vi });
  const content = `
    Thân gửi bạn ${data.fullName}!<br>
    <br>
    Một lần nữa chúc mừng bạn đã xuất sắc vượt qua phỏng vấn cá nhân đợt Tuyển thành viên của tổ chức Khoảng Trời Của Bé.<br>
    <br>
    Như đã đề cập ở email trước, chúng mình xin phép gửi bạn một số thông tin cụ thể về Buổi gặp mặt thành viên mới, cụ thể như sau:<br>
    - Thời gian: ${formattedDateTime}.<br>
    - Địa điểm: ${data.address} ${data.linkMaps}<br>
    - Liên hệ tiếp đón: ${data.phoneNumber} - ${data.host}<br>
    <br>
    Bạn vui lòng xác nhận việc tham gia buổi gặp mặt qua email này để chúng mình có sự chuẩn bị tiếp đón bạn tốt nhất nhé. Hẹn gặp lại bạn!<br>
    <br>
    Thân mến!<br>
    Khoảng Trời Của Bé<br>
  `;

  return mailTemplate(content);
};