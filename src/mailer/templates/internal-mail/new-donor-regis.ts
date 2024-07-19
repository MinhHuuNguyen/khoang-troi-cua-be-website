/* eslint-disable import/no-anonymous-default-export */
import mailTemplate from "../template";
// TODO: Dùng sau khi xác nhận nhận đơn đăng ký

export default (data: any) => {
  const content = `
    Thân gửi Team KTSTN,<br>
    <br>
   Đã có nhà hảo tâm tham gia quyên góp tại Khoảng Trời Của Bé, thông tin chi tiết như sau:<br>
    1. Họ và tên: ${data.fullName}<br>
    2. Ngày, tháng, năm sinh: ${new Date(data.birthday).toLocaleDateString(
      "vi"
    )}<br>
    3. Số điện thoại: ${data.phoneNumber}<br>
    4. Email: ${data.email}<br>
    <br>
    Bạn hãy lưu lại thông tin của nhà hảo tâm nhé.<br>
    <br>
    Thân mến!<br>
    Khoảng Trời Của Bé<br>
  `;

  return mailTemplate(content);
};