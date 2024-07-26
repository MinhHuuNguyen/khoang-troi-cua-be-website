import mailTemplate from "./template";

export default (data: any) => {
  const content = `
    Thân gửi bạn ${data.fullName}!<br>
    <br>
    Dưới đây là bài viết: <br>
    <br>
    
  `

  return mailTemplate(content);
};
