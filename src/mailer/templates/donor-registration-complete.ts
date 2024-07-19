import mailTemplate from "./template";
import { DonorRegistration } from "@prisma/client";

export const mailDonorRegistration = (data: DonorRegistration) => {
  const content = `
    Thân gửi quý nhà hảo tâm ${data.fullName}!<br>
    <br>
    Lời đầu tiên, Khoảng Trời Của Bé xin được gửi đến quý nhà hảo tâm lời chào và lời cảm ơn chân thành nhất vì sự chia sẻ, đồng hành của quý nhà hảo tâm với Khoảng Trời Của Bé.<br>
    Tấm lòng nhân ái, san sẻ của quý nhà hảo tâm sẽ là nguồn động viên to lớn để Khoảng Trời Của Bé giúp đỡ các em nhỏ có hoàn cảnh khó khăn.<br>
    <br>
    Khoảng Trời Của Bé xác nhận đã nhận được thông tin quyên góp của quý nhà hảo tâm. Thông tin chi tiết như sau:<br>
    1. Họ và tên: ${data.fullName}<br>
    2. Ngày, tháng, năm sinh: ${new Date(data.birthday).toLocaleDateString(
      "vi"
    )}<br>
    3. Số điện thoại: ${data.phoneNumber}<br>
    4. Email: ${data.email}<br>
    <br>
    Trong trường hợp thông tin có sai sót, xin vui lòng liên hệ với Khoảng Trời Của Bé bằng cách trả lời lại email này.<br>
    <br>
    Một lần nữa, Khoảng Trời Của Bé xin chân thành cảm ơn và rất mong sẽ tiếp tục nhận được sự đồng hành, chia sẻ từ những vòng tay nhân ái của quý nhà hảo tâm trong tương lai!<br>
    <br>
    Thân mến,<br>
    Khoảng Trời Của Bé<br>
  `;

  return mailTemplate(content);
};
