/* eslint-disable import/no-anonymous-default-export */
import mailTemplate from "../template";

export default (data: any) => {
  const content = `
 Thông tin hồ sơ ứng tuyển:<br>
    1. Họ và tên: ${data.fullName}<br>
    2. Ngày, tháng, năm sinh: ${new Date(data.birthday).toLocaleDateString(
      "vi"
    )}<br>
    3. Số điện thoại: ${data.phoneNumber}<br>
    4. Email: ${data.email}<br>
    5. Nơi học tập hoặc công tác: ${data.workPlace}<br>
    6. Nơi sống: ${data.address}<br>
    7. Kinh nghiệm tham gia hoạt động xã hội: ${
      data.hasSocialActivities ? "Có" : "Không"
    }<br>
    8. Kỷ niệm khi tham gia hoạt động xã hội: ${data.memories}<br>
    9. Vị trí muốn tham gia tại Khoảng Trời Của Bé: ${data.position.name}<br>
    10. Mong muốn của bạn khi tham gia Khoảng Trời Của Bé: ${
      data.hopeToReceive
    }
  `;

  return mailTemplate(content);
};
