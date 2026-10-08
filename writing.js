const prompts = [
  {
    topic: "Do you think more people will work from home in the future?",
    points: ["Time", "Family", "Technology"],
    model: "I think that more people will work from home in the future. I have two reasons. First, working from home saves time because people do not have to travel to their offices. They can use this extra time for their families or hobbies. Second, technology is becoming better. People can easily have online meetings and share information with coworkers. For these reasons, I believe working from home will become more common."
  },
  {
    topic: "Should students use tablets instead of textbooks at school?",
    points: ["Convenience", "Cost", "Learning"],
    model: "I think students should use tablets at school. First, tablets are convenient because students can carry many books in one small device. Their school bags will be much lighter. Second, tablets can make learning more interesting. Students can watch videos and use educational applications during class. Although tablets can be expensive, they are useful in many ways. Therefore, I think schools should use them more often."
  },
  {
    topic: "Do you think cities should have more parks?",
    points: ["Health", "Environment", "Community"],
    model: "I think cities should have more parks. First, parks give people places to exercise and relax. This is good for both their physical and mental health. Second, trees and plants in parks help improve the environment. They can make the air cleaner and keep cities cooler in summer. Parks are also places where neighbors can meet. For these reasons, I believe more parks will make cities better places to live."
  },
  {
    topic: "Should high school students have part-time jobs?",
    points: ["Experience", "Study", "Money"],
    model: "I think high school students should be allowed to have part-time jobs. First, they can learn important skills such as communicating with customers and working with other people. These skills will be useful in the future. Second, students can learn how to manage money by earning and saving it themselves. They must be careful not to work too many hours, because studying is still important. With a good schedule, a part-time job can be a valuable experience."
  },
  {
    topic: "Do you think people should use public transportation more often?",
    points: ["Environment", "Cost", "Convenience"],
    model: "I think people should use public transportation more often. First, buses and trains can carry many passengers at once, so they produce less pollution per person than cars. This is better for the environment. Second, using public transportation can save money because people do not need to pay for gas or parking. It may not be convenient in every area, but cities can improve their services. Therefore, I believe more people should choose buses and trains."
  },
  {
    topic: "Should schools give students less homework?",
    points: ["Free time", "Review", "Stress"],
    model: "I think schools should give students less homework. First, students need time to rest, exercise, and spend time with their families after school. Too much homework can cause stress and make it difficult to sleep. Second, a smaller amount of well-chosen homework may help students review more effectively. They can focus on important points instead of rushing through many tasks. For these reasons, I think teachers should give less homework but make each assignment more useful."
  },
  {
    topic: "Do you think online shopping will continue to grow?",
    points: ["Choice", "Safety", "Delivery"],
    model: "I think online shopping will continue to grow. First, online stores offer a wide choice of products, and shoppers can compare prices easily. This helps people find what they need without visiting many stores. Second, delivery services are becoming faster and more convenient, even in smaller towns. However, companies must protect customers' personal information and make online payments safe. If they do this, more people will feel comfortable buying things online in the future."
  },
  {
    topic: "Should more people volunteer in their communities?",
    points: ["Experience", "Neighbors", "Time"],
    model: "I think more people should volunteer in their communities. First, volunteering helps solve local problems. For example, people can clean parks, support children, or help older residents. Second, volunteers can meet neighbors and learn new skills. These experiences may also help them at school or work. Some people are busy, but even a few hours each month can make a difference. Therefore, I believe community volunteering is valuable for both residents and volunteers."
  },
  {
    topic: "Do you think school uniforms are useful?",
    points: ["Cost", "Identity", "Choice"],
    model: "I think school uniforms are useful. First, students do not have to spend time choosing what to wear every morning. This can also reduce pressure to buy expensive fashionable clothes. Second, uniforms can help students feel that they are part of the same school community. Some students want more freedom to express themselves, but schools can allow small choices such as bags or shoes. Overall, uniforms make school life simpler and more equal."
  },
  {
    topic: "Should restaurants reduce the amount of food they throw away?",
    points: ["Environment", "Cost", "Customers"],
    model: "I think restaurants should reduce food waste. First, producing and transporting food uses water, energy, and fuel. Throwing good food away wastes all of these resources and harms the environment. Second, restaurants can save money by buying and preparing the right amount of food. They could also offer smaller portions or donate safe extra food to local groups. These actions would help restaurants, customers, and the community, so reducing food waste is important."
  },
  {
    topic: "Do you think children should spend more time outdoors?",
    points: ["Health", "Safety", "Technology"],
    model: "I think children should spend more time outdoors. First, outdoor activities such as running and playing sports improve children's physical health. They can also reduce stress and help children sleep better. Second, playing outside gives children chances to explore nature and make friends face to face. Parents should choose safe places and set reasonable rules. Although technology is useful, a good balance between screen time and outdoor time is important for healthy growth."
  },
  {
    topic: "Should companies allow employees to choose their working hours?",
    points: ["Productivity", "Family", "Communication"],
    model: "I think companies should allow employees to choose their working hours when possible. First, people can work at the time when they are most focused, which may improve productivity. Second, flexible hours make it easier for workers to care for children or family members. However, teams still need time to communicate and hold meetings. Companies can set a few shared hours each day. With clear rules, flexible schedules can benefit both employees and businesses."
  },
  {
    topic: "Do you think museums should be free for students?",
    points: ["Education", "Cost", "Visitors"],
    model: "I think museums should be free for students. First, museums help young people learn about history, science, and art outside the classroom. Seeing real objects can make lessons more memorable. Second, some families cannot afford entrance fees, especially when they have several children. Free admission would give every student the same opportunity to learn. Museums may receive less ticket money, but more visitors could support their shops and special events."
  },
  {
    topic: "Should people repair old products instead of buying new ones?",
    points: ["Environment", "Price", "Technology"],
    model: "I think people should repair old products when possible. First, repairing phones, furniture, and appliances reduces waste and saves natural resources. This is good for the environment. Second, repairs are often cheaper than buying a completely new product. However, very old machines may use too much energy or be unsafe. People should compare the repair cost and condition carefully. In many cases, keeping a useful product longer is a smart choice."
  },
  {
    topic: "Do you think students should study abroad?",
    points: ["Language", "Culture", "Cost"],
    model: "I think students should study abroad if they have the opportunity. First, they can improve their language skills by using the language in daily life. This kind of practice is difficult to get only from textbooks. Second, living in another country helps students understand different cultures and become more independent. Studying abroad can be expensive, but scholarships and shorter programs can reduce the cost. The experience can be valuable for a student's future."
  }
];

const $ = (selector) => document.querySelector(selector);
let modelOpen = false;

$("#promptSelect").innerHTML = prompts.map((_, index) => `<option value="${index}">お題 ${index + 1}</option>`).join("");

function loadPrompt() {
  const prompt = prompts[Number($("#promptSelect").value)];
  $("#writingTopic").textContent = prompt.topic;
  $("#writingPoints").innerHTML = prompt.points.map((point) => `<li>${point}</li>`).join("");
  $("#modelText").textContent = prompt.model;
  modelOpen = false;
  $("#modelAnswer").hidden = true;
  $("#modelToggle").textContent = "模範解答を見る";
}

function count() {
  const text = $("#essay").value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  $("#wordCount").textContent = `${words} words`;
  $("#countGuide").textContent = words < 80 ? `あと${80 - words}語で目標に到達` : words <= 100 ? "目標語数に達しています" : `目標より${words - 100}語多いです`;
  $("#countGuide").className = words >= 80 && words <= 100 ? "count-guide on-target" : "count-guide";
}

$("#promptSelect").addEventListener("change", loadPrompt);
$("#essay").addEventListener("input", count);
$("#modelToggle").addEventListener("click", () => {
  modelOpen = !modelOpen;
  $("#modelAnswer").hidden = !modelOpen;
  $("#modelToggle").textContent = modelOpen ? "模範解答を閉じる" : "模範解答を見る";
});

loadPrompt();
count();
