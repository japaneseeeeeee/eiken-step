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
  },

  {
    "topic": "Should schools teach more about personal finance?",
    "points": [
      "Learning",
      "Future",
      "Skills"
    ],
    "model": "I think schools should teach more about personal finance. I have two reasons. First, students can learn to save and plan a budget. This can make everyday life easier and give people more useful choices. Second, the knowledge will help them avoid money problems as adults. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should teach more about personal finance."
  },
  {
    "topic": "Should schools teach more about cooking?",
    "points": [
      "Learning",
      "Future",
      "Skills"
    ],
    "model": "I think schools should teach more about cooking. I have two reasons. First, students can prepare healthy meals for themselves. This can make everyday life easier and give people more useful choices. Second, cooking also teaches planning and responsibility. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should teach more about cooking."
  },
  {
    "topic": "Should schools teach more about first aid?",
    "points": [
      "Learning",
      "Future",
      "Skills"
    ],
    "model": "I think schools should teach more about first aid. I have two reasons. First, students can respond calmly in an emergency. This can make everyday life easier and give people more useful choices. Second, basic skills may protect friends and family members. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should teach more about first aid."
  },
  {
    "topic": "Should schools teach more about online safety?",
    "points": [
      "Learning",
      "Future",
      "Skills"
    ],
    "model": "I think schools should teach more about online safety. I have two reasons. First, students can learn to protect personal information. This can make everyday life easier and give people more useful choices. Second, they will recognize false information and dangerous messages. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should teach more about online safety."
  },
  {
    "topic": "Should schools teach more about public speaking?",
    "points": [
      "Learning",
      "Future",
      "Skills"
    ],
    "model": "I think schools should teach more about public speaking. I have two reasons. First, students can express their ideas clearly. This can make everyday life easier and give people more useful choices. Second, confidence in speaking is useful at university and work. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should teach more about public speaking."
  },
  {
    "topic": "Should science museums be free for students?",
    "points": [
      "Education",
      "Cost",
      "Access"
    ],
    "model": "I think science museums should be free for students. I have two reasons. First, students can connect classroom lessons with real exhibits. This can make everyday life easier and give people more useful choices. Second, free entry gives every family the same opportunity. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe science museums should be free for students."
  },
  {
    "topic": "Should public swimming pools be free for students?",
    "points": [
      "Education",
      "Cost",
      "Access"
    ],
    "model": "I think public swimming pools should be free for students. I have two reasons. First, regular exercise improves students' health. This can make everyday life easier and give people more useful choices. Second, families can enjoy safe activities without worrying about fees. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe public swimming pools should be free for students."
  },
  {
    "topic": "Should local concerts be free for students?",
    "points": [
      "Education",
      "Cost",
      "Access"
    ],
    "model": "I think local concerts should be free for students. I have two reasons. First, live music can deepen cultural understanding. This can make everyday life easier and give people more useful choices. Second, young people may discover new interests and talents. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe local concerts should be free for students."
  },
  {
    "topic": "Should city buses on weekends be free for students?",
    "points": [
      "Education",
      "Cost",
      "Access"
    ],
    "model": "I think city buses on weekends should be free for students. I have two reasons. First, students can reach libraries and community events. This can make everyday life easier and give people more useful choices. Second, parents will not need to drive them everywhere. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe city buses on weekends should be free for students."
  },
  {
    "topic": "Should language-learning applications be free for students?",
    "points": [
      "Education",
      "Cost",
      "Access"
    ],
    "model": "I think language-learning applications should be free for students. I have two reasons. First, students can practice whenever they have time. This can make everyday life easier and give people more useful choices. Second, free access reduces differences between households. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe language-learning applications should be free for students."
  },
  {
    "topic": "Should cities build more bicycle lanes?",
    "points": [
      "Community",
      "Convenience",
      "Environment"
    ],
    "model": "I think cities should build more bicycle lanes. I have two reasons. First, safer roads would encourage more people to cycle. This can make everyday life easier and give people more useful choices. Second, fewer car trips would reduce air pollution. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should build more bicycle lanes."
  },
  {
    "topic": "Should cities build more public drinking fountains?",
    "points": [
      "Community",
      "Convenience",
      "Environment"
    ],
    "model": "I think cities should build more public drinking fountains. I have two reasons. First, people could stay hydrated during hot weather. This can make everyday life easier and give people more useful choices. Second, reusable bottles would reduce plastic waste. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should build more public drinking fountains."
  },
  {
    "topic": "Should cities build more community gardens?",
    "points": [
      "Community",
      "Convenience",
      "Environment"
    ],
    "model": "I think cities should build more community gardens. I have two reasons. First, residents could grow fresh food together. This can make everyday life easier and give people more useful choices. Second, gardens create green spaces and stronger neighborhoods. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should build more community gardens."
  },
  {
    "topic": "Should cities build more covered bus stops?",
    "points": [
      "Community",
      "Convenience",
      "Environment"
    ],
    "model": "I think cities should build more covered bus stops. I have two reasons. First, passengers would be protected from rain and strong sunlight. This can make everyday life easier and give people more useful choices. Second, comfortable stops could increase bus use. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should build more covered bus stops."
  },
  {
    "topic": "Should cities build more recycling stations?",
    "points": [
      "Community",
      "Convenience",
      "Environment"
    ],
    "model": "I think cities should build more recycling stations. I have two reasons. First, people could recycle items that are not collected at home. This can make everyday life easier and give people more useful choices. Second, useful materials would be kept out of landfills. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should build more recycling stations."
  },
  {
    "topic": "Should people reduce their use of single-use plastic bags?",
    "points": [
      "Environment",
      "Cost",
      "Choices"
    ],
    "model": "I think people should reduce their use of single-use plastic bags. I have two reasons. First, reusable bags create much less waste. This can make everyday life easier and give people more useful choices. Second, stores and shoppers can also save money over time. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should reduce their use of single-use plastic bags."
  },
  {
    "topic": "Should people reduce their use of private cars in city centers?",
    "points": [
      "Environment",
      "Cost",
      "Choices"
    ],
    "model": "I think people should reduce their use of private cars in city centers. I have two reasons. First, public transportation can reduce traffic. This can make everyday life easier and give people more useful choices. Second, cleaner streets are healthier for residents. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should reduce their use of private cars in city centers."
  },
  {
    "topic": "Should people reduce their use of paper receipts?",
    "points": [
      "Environment",
      "Cost",
      "Choices"
    ],
    "model": "I think people should reduce their use of paper receipts. I have two reasons. First, digital receipts use fewer natural resources. This can make everyday life easier and give people more useful choices. Second, customers can organize purchase records more easily. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should reduce their use of paper receipts."
  },
  {
    "topic": "Should people reduce their use of disposable cups?",
    "points": [
      "Environment",
      "Cost",
      "Choices"
    ],
    "model": "I think people should reduce their use of disposable cups. I have two reasons. First, reusable cups reduce trash from cafes. This can make everyday life easier and give people more useful choices. Second, many shops offer discounts to customers who bring them. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should reduce their use of disposable cups."
  },
  {
    "topic": "Should people reduce their use of air conditioners?",
    "points": [
      "Environment",
      "Cost",
      "Choices"
    ],
    "model": "I think people should reduce their use of air conditioners. I have two reasons. First, moderate use saves electricity. This can make everyday life easier and give people more useful choices. Second, fans and better clothing can keep people comfortable in many situations. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should reduce their use of air conditioners."
  },
  {
    "topic": "Should companies provide more training opportunities?",
    "points": [
      "Work",
      "Health",
      "Productivity"
    ],
    "model": "I think companies should provide more training opportunities. I have two reasons. First, workers can develop useful skills. This can make everyday life easier and give people more useful choices. Second, companies can fill new positions with experienced employees. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe companies should provide more training opportunities."
  },
  {
    "topic": "Should companies provide more flexible vacation days?",
    "points": [
      "Work",
      "Health",
      "Productivity"
    ],
    "model": "I think companies should provide more flexible vacation days. I have two reasons. First, employees can rest when they need to. This can make everyday life easier and give people more useful choices. Second, better rest can improve focus and productivity. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe companies should provide more flexible vacation days."
  },
  {
    "topic": "Should companies provide more childcare support?",
    "points": [
      "Work",
      "Health",
      "Productivity"
    ],
    "model": "I think companies should provide more childcare support. I have two reasons. First, parents can continue working with less stress. This can make everyday life easier and give people more useful choices. Second, companies can keep skilled employees for longer. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe companies should provide more childcare support."
  },
  {
    "topic": "Should companies provide more quiet workspaces?",
    "points": [
      "Work",
      "Health",
      "Productivity"
    ],
    "model": "I think companies should provide more quiet workspaces. I have two reasons. First, employees can concentrate on difficult tasks. This can make everyday life easier and give people more useful choices. Second, different spaces support different styles of work. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe companies should provide more quiet workspaces."
  },
  {
    "topic": "Should companies provide more volunteer days?",
    "points": [
      "Work",
      "Health",
      "Productivity"
    ],
    "model": "I think companies should provide more volunteer days. I have two reasons. First, workers can help local communities. This can make everyday life easier and give people more useful choices. Second, shared activities can strengthen teamwork. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe companies should provide more volunteer days."
  },
  {
    "topic": "Should schools use more online lessons during bad weather?",
    "points": [
      "Technology",
      "Learning",
      "Access"
    ],
    "model": "I think schools should use more online lessons during bad weather. I have two reasons. First, students can continue learning when travel is unsafe. This can make everyday life easier and give people more useful choices. Second, teachers can share materials quickly. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should use more online lessons during bad weather."
  },
  {
    "topic": "Should schools use more electronic dictionaries?",
    "points": [
      "Technology",
      "Learning",
      "Access"
    ],
    "model": "I think schools should use more electronic dictionaries. I have two reasons. First, students can check pronunciation and examples easily. This can make everyday life easier and give people more useful choices. Second, one device can contain many useful references. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should use more electronic dictionaries."
  },
  {
    "topic": "Should schools use more educational videos?",
    "points": [
      "Technology",
      "Learning",
      "Access"
    ],
    "model": "I think schools should use more educational videos. I have two reasons. First, visual explanations make difficult ideas clearer. This can make everyday life easier and give people more useful choices. Second, students can review important parts at their own speed. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should use more educational videos."
  },
  {
    "topic": "Should schools use more digital maps in geography classes?",
    "points": [
      "Technology",
      "Learning",
      "Access"
    ],
    "model": "I think schools should use more digital maps in geography classes. I have two reasons. First, students can explore places in detail. This can make everyday life easier and give people more useful choices. Second, updated information is available without buying new atlases. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should use more digital maps in geography classes."
  },
  {
    "topic": "Should schools use more online practice tests?",
    "points": [
      "Technology",
      "Learning",
      "Access"
    ],
    "model": "I think schools should use more online practice tests. I have two reasons. First, students receive results immediately. This can make everyday life easier and give people more useful choices. Second, teachers can identify topics that need more review. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should use more online practice tests."
  },
  {
    "topic": "Should young people spend more time playing team sports?",
    "points": [
      "Health",
      "Experience",
      "Balance"
    ],
    "model": "I think young people should spend more time playing team sports. I have two reasons. First, regular activity improves physical health. This can make everyday life easier and give people more useful choices. Second, teams teach communication and cooperation. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe young people should spend more time playing team sports."
  },
  {
    "topic": "Should young people spend more time reading for pleasure?",
    "points": [
      "Health",
      "Experience",
      "Balance"
    ],
    "model": "I think young people should spend more time reading for pleasure. I have two reasons. First, books develop language and imagination. This can make everyday life easier and give people more useful choices. Second, quiet reading provides a healthy break from screens. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe young people should spend more time reading for pleasure."
  },
  {
    "topic": "Should young people spend more time learning music?",
    "points": [
      "Health",
      "Experience",
      "Balance"
    ],
    "model": "I think young people should spend more time learning music. I have two reasons. First, practice teaches patience and concentration. This can make everyday life easier and give people more useful choices. Second, playing music gives people a creative way to express feelings. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe young people should spend more time learning music."
  },
  {
    "topic": "Should young people spend more time volunteering?",
    "points": [
      "Health",
      "Experience",
      "Balance"
    ],
    "model": "I think young people should spend more time volunteering. I have two reasons. First, young people can understand local needs. This can make everyday life easier and give people more useful choices. Second, they gain experience that may help in future work. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe young people should spend more time volunteering."
  },
  {
    "topic": "Should young people spend more time exploring nature?",
    "points": [
      "Health",
      "Experience",
      "Balance"
    ],
    "model": "I think young people should spend more time exploring nature. I have two reasons. First, outdoor activity reduces stress. This can make everyday life easier and give people more useful choices. Second, direct experience encourages care for the environment. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe young people should spend more time exploring nature."
  },
  {
    "topic": "Should communities do more to support older residents?",
    "points": [
      "Support",
      "Community",
      "Opportunity"
    ],
    "model": "I think communities should do more to support older residents. I have two reasons. First, regular services can help them live safely. This can make everyday life easier and give people more useful choices. Second, community activities reduce loneliness. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe communities should do more to support older residents."
  },
  {
    "topic": "Should communities do more to support new residents?",
    "points": [
      "Support",
      "Community",
      "Opportunity"
    ],
    "model": "I think communities should do more to support new residents. I have two reasons. First, clear information helps people use local services. This can make everyday life easier and give people more useful choices. Second, welcome events make it easier to form friendships. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe communities should do more to support new residents."
  },
  {
    "topic": "Should communities do more to support local shops?",
    "points": [
      "Support",
      "Community",
      "Opportunity"
    ],
    "model": "I think communities should do more to support local shops. I have two reasons. First, small businesses keep money in the area. This can make everyday life easier and give people more useful choices. Second, unique stores make neighborhoods more attractive. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe communities should do more to support local shops."
  },
  {
    "topic": "Should communities do more to support animal shelters?",
    "points": [
      "Support",
      "Community",
      "Opportunity"
    ],
    "model": "I think communities should do more to support animal shelters. I have two reasons. First, shelters need food and volunteers. This can make everyday life easier and give people more useful choices. Second, better support can help more animals find safe homes. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe communities should do more to support animal shelters."
  },
  {
    "topic": "Should communities do more to support families with young children?",
    "points": [
      "Support",
      "Community",
      "Opportunity"
    ],
    "model": "I think communities should do more to support families with young children. I have two reasons. First, parents need safe places and useful advice. This can make everyday life easier and give people more useful choices. Second, support makes the whole community stronger. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe communities should do more to support families with young children."
  },
  {
    "topic": "Should travelers visit places near their homes more often?",
    "points": [
      "Travel",
      "Environment",
      "Culture"
    ],
    "model": "I think travelers should visit places near their homes more often. I have two reasons. First, shorter journeys usually cost less. This can make everyday life easier and give people more useful choices. Second, local travel can support nearby businesses. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe travelers should visit places near their homes more often."
  },
  {
    "topic": "Should travelers use trains instead of airplanes more often?",
    "points": [
      "Travel",
      "Environment",
      "Culture"
    ],
    "model": "I think travelers should use trains instead of airplanes more often. I have two reasons. First, trains often create less pollution. This can make everyday life easier and give people more useful choices. Second, passengers can enjoy scenery and city-center stations. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe travelers should use trains instead of airplanes more often."
  },
  {
    "topic": "Should travelers stay at locally owned hotels more often?",
    "points": [
      "Travel",
      "Environment",
      "Culture"
    ],
    "model": "I think travelers should stay at locally owned hotels more often. I have two reasons. First, more money remains in the community. This can make everyday life easier and give people more useful choices. Second, visitors may receive more personal information about the area. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe travelers should stay at locally owned hotels more often."
  },
  {
    "topic": "Should travelers travel outside busy seasons more often?",
    "points": [
      "Travel",
      "Environment",
      "Culture"
    ],
    "model": "I think travelers should travel outside busy seasons more often. I have two reasons. First, popular places become less crowded. This can make everyday life easier and give people more useful choices. Second, prices are often lower for visitors. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe travelers should travel outside busy seasons more often."
  },
  {
    "topic": "Should travelers join tours led by local guides more often?",
    "points": [
      "Travel",
      "Environment",
      "Culture"
    ],
    "model": "I think travelers should join tours led by local guides more often. I have two reasons. First, guides explain history and customs accurately. This can make everyday life easier and give people more useful choices. Second, tour fees support people who live in the area. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe travelers should join tours led by local guides more often."
  },
  {
    "topic": "Should people be more careful about news shared on social media?",
    "points": [
      "Media",
      "Safety",
      "Time"
    ],
    "model": "I think people should be more careful about news shared on social media. I have two reasons. First, false stories can spread very quickly. This can make everyday life easier and give people more useful choices. Second, checking reliable sources leads to better decisions. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should be more careful about news shared on social media."
  },
  {
    "topic": "Should people be more careful about the time they spend online?",
    "points": [
      "Media",
      "Safety",
      "Time"
    ],
    "model": "I think people should be more careful about the time they spend online. I have two reasons. First, long screen use can harm sleep. This can make everyday life easier and give people more useful choices. Second, time limits leave room for exercise and face-to-face communication. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should be more careful about the time they spend online."
  },
  {
    "topic": "Should people be more careful about photographs they post online?",
    "points": [
      "Media",
      "Safety",
      "Time"
    ],
    "model": "I think people should be more careful about photographs they post online. I have two reasons. First, pictures may reveal private information. This can make everyday life easier and give people more useful choices. Second, asking permission respects other people's feelings. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should be more careful about photographs they post online."
  },
  {
    "topic": "Should people be more careful about online reviews?",
    "points": [
      "Media",
      "Safety",
      "Time"
    ],
    "model": "I think people should be more careful about online reviews. I have two reasons. First, some reviews may not be honest. This can make everyday life easier and give people more useful choices. Second, comparing several sources gives a fairer picture. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should be more careful about online reviews."
  },
  {
    "topic": "Should people be more careful about messages from unknown people?",
    "points": [
      "Media",
      "Safety",
      "Time"
    ],
    "model": "I think people should be more careful about messages from unknown people. I have two reasons. First, strangers may try to steal information. This can make everyday life easier and give people more useful choices. Second, careful users can avoid many online problems. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should be more careful about messages from unknown people."
  },
  {
    "topic": "Should high schools start classes later?",
    "points": [
      "School",
      "Students",
      "Learning"
    ],
    "model": "I think high schools should start classes later. I have two reasons. First, teenagers need enough sleep to concentrate. This can make everyday life easier and give people more useful choices. Second, later starts may improve health and attendance. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe high schools should start classes later."
  },
  {
    "topic": "Should high schools offer more club activities?",
    "points": [
      "School",
      "Students",
      "Learning"
    ],
    "model": "I think high schools should offer more club activities. I have two reasons. First, students can discover interests outside lessons. This can make everyday life easier and give people more useful choices. Second, clubs help students make friends across classes. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe high schools should offer more club activities."
  },
  {
    "topic": "Should high schools limit smartphone use during lessons?",
    "points": [
      "School",
      "Students",
      "Learning"
    ],
    "model": "I think high schools should limit smartphone use during lessons. I have two reasons. First, fewer notifications improve concentration. This can make everyday life easier and give people more useful choices. Second, students will communicate more directly with classmates. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe high schools should limit smartphone use during lessons."
  },
  {
    "topic": "Should high schools hold more classes outdoors?",
    "points": [
      "School",
      "Students",
      "Learning"
    ],
    "model": "I think high schools should hold more classes outdoors. I have two reasons. First, new settings can make lessons memorable. This can make everyday life easier and give people more useful choices. Second, time outside can reduce stress. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe high schools should hold more classes outdoors."
  },
  {
    "topic": "Should high schools invite professionals to speak?",
    "points": [
      "School",
      "Students",
      "Learning"
    ],
    "model": "I think high schools should invite professionals to speak. I have two reasons. First, students learn how school subjects are used at work. This can make everyday life easier and give people more useful choices. Second, real experiences can help them plan careers. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe high schools should invite professionals to speak."
  },
  {
    "topic": "Do you think people should walk for at least thirty minutes a day?",
    "points": [
      "Health",
      "Habit",
      "Lifestyle"
    ],
    "model": "I think people should walk for at least thirty minutes a day. I have two reasons. First, walking is an easy form of exercise. This can make everyday life easier and give people more useful choices. Second, daily walks can reduce stress and improve sleep. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should walk for at least thirty minutes a day."
  },
  {
    "topic": "Do you think people should eat breakfast every morning?",
    "points": [
      "Health",
      "Habit",
      "Lifestyle"
    ],
    "model": "I think people should eat breakfast every morning. I have two reasons. First, breakfast provides energy for work or study. This can make everyday life easier and give people more useful choices. Second, a regular meal can prevent unhealthy snacks later. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should eat breakfast every morning."
  },
  {
    "topic": "Do you think people should cook at home more often?",
    "points": [
      "Health",
      "Habit",
      "Lifestyle"
    ],
    "model": "I think people should cook at home more often. I have two reasons. First, home cooks can control ingredients. This can make everyday life easier and give people more useful choices. Second, preparing meals is often cheaper than eating out. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should cook at home more often."
  },
  {
    "topic": "Do you think people should have regular health checkups?",
    "points": [
      "Health",
      "Habit",
      "Lifestyle"
    ],
    "model": "I think people should have regular health checkups. I have two reasons. First, doctors can find problems early. This can make everyday life easier and give people more useful choices. Second, professional advice helps people improve daily habits. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should have regular health checkups."
  },
  {
    "topic": "Do you think people should take short breaks while studying?",
    "points": [
      "Health",
      "Habit",
      "Lifestyle"
    ],
    "model": "I think people should take short breaks while studying. I have two reasons. First, brief rests help the brain stay focused. This can make everyday life easier and give people more useful choices. Second, standing and moving prevents physical discomfort. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe people should take short breaks while studying."
  },
  {
    "topic": "Should schools encourage students to learn more about local festivals?",
    "points": [
      "Culture",
      "Understanding",
      "Education"
    ],
    "model": "I think schools should encourage students to learn more about local festivals. I have two reasons. First, students can understand the history of their community. This can make everyday life easier and give people more useful choices. Second, participation connects different generations. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should encourage students to learn more about local festivals."
  },
  {
    "topic": "Should schools encourage students to learn more about traditional crafts?",
    "points": [
      "Culture",
      "Understanding",
      "Education"
    ],
    "model": "I think schools should encourage students to learn more about traditional crafts. I have two reasons. First, important skills may disappear without young learners. This can make everyday life easier and give people more useful choices. Second, making objects develops patience and creativity. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should encourage students to learn more about traditional crafts."
  },
  {
    "topic": "Should schools encourage students to learn more about foreign cultures?",
    "points": [
      "Culture",
      "Understanding",
      "Education"
    ],
    "model": "I think schools should encourage students to learn more about foreign cultures. I have two reasons. First, students become more open to different ideas. This can make everyday life easier and give people more useful choices. Second, cultural knowledge supports international communication. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should encourage students to learn more about foreign cultures."
  },
  {
    "topic": "Should schools encourage students to learn more about regional food?",
    "points": [
      "Culture",
      "Understanding",
      "Education"
    ],
    "model": "I think schools should encourage students to learn more about regional food. I have two reasons. First, food reveals local history and geography. This can make everyday life easier and give people more useful choices. Second, students can support farmers and traditional businesses. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should encourage students to learn more about regional food."
  },
  {
    "topic": "Should schools encourage students to learn more about historic buildings?",
    "points": [
      "Culture",
      "Understanding",
      "Education"
    ],
    "model": "I think schools should encourage students to learn more about historic buildings. I have two reasons. First, real places make history easier to understand. This can make everyday life easier and give people more useful choices. Second, young people may become interested in protecting them. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe schools should encourage students to learn more about historic buildings."
  },
  {
    "topic": "Should workplaces have more plants?",
    "points": [
      "Work",
      "Comfort",
      "Efficiency"
    ],
    "model": "I think workplaces should have more plants. I have two reasons. First, green spaces can make offices feel calmer. This can make everyday life easier and give people more useful choices. Second, plants may improve the air and appearance of a room. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe workplaces should have more plants."
  },
  {
    "topic": "Should workplaces have more standing desks?",
    "points": [
      "Work",
      "Comfort",
      "Efficiency"
    ],
    "model": "I think workplaces should have more standing desks. I have two reasons. First, workers can change position during the day. This can make everyday life easier and give people more useful choices. Second, movement may reduce back pain from long periods of sitting. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe workplaces should have more standing desks."
  },
  {
    "topic": "Should workplaces have more shared break areas?",
    "points": [
      "Work",
      "Comfort",
      "Efficiency"
    ],
    "model": "I think workplaces should have more shared break areas. I have two reasons. First, employees can relax away from their desks. This can make everyday life easier and give people more useful choices. Second, informal conversations can improve teamwork. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe workplaces should have more shared break areas."
  },
  {
    "topic": "Should workplaces have more video meeting rooms?",
    "points": [
      "Work",
      "Comfort",
      "Efficiency"
    ],
    "model": "I think workplaces should have more video meeting rooms. I have two reasons. First, remote colleagues can join discussions clearly. This can make everyday life easier and give people more useful choices. Second, teams spend less time arranging equipment. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe workplaces should have more video meeting rooms."
  },
  {
    "topic": "Should workplaces have more bicycle parking?",
    "points": [
      "Work",
      "Comfort",
      "Efficiency"
    ],
    "model": "I think workplaces should have more bicycle parking. I have two reasons. First, safe parking encourages healthy commuting. This can make everyday life easier and give people more useful choices. Second, more cycling can reduce demand for car spaces. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe workplaces should have more bicycle parking."
  },
  {
    "topic": "Should shoppers choose more secondhand products?",
    "points": [
      "Shopping",
      "Environment",
      "Community"
    ],
    "model": "I think shoppers should choose more secondhand products. I have two reasons. First, reusing items reduces waste. This can make everyday life easier and give people more useful choices. Second, good-quality used products often cost less. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe shoppers should choose more secondhand products."
  },
  {
    "topic": "Should shoppers choose more locally produced food?",
    "points": [
      "Shopping",
      "Environment",
      "Community"
    ],
    "model": "I think shoppers should choose more locally produced food. I have two reasons. First, local purchases support nearby farmers. This can make everyday life easier and give people more useful choices. Second, shorter transportation may reduce pollution. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe shoppers should choose more locally produced food."
  },
  {
    "topic": "Should shoppers choose more products with less packaging?",
    "points": [
      "Shopping",
      "Environment",
      "Community"
    ],
    "model": "I think shoppers should choose more products with less packaging. I have two reasons. First, less material becomes household trash. This can make everyday life easier and give people more useful choices. Second, simple packaging can also reduce production costs. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe shoppers should choose more products with less packaging."
  },
  {
    "topic": "Should shoppers choose more repairable electronics?",
    "points": [
      "Shopping",
      "Environment",
      "Community"
    ],
    "model": "I think shoppers should choose more repairable electronics. I have two reasons. First, devices can be used for a longer time. This can make everyday life easier and give people more useful choices. Second, repairs reduce the need for new raw materials. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe shoppers should choose more repairable electronics."
  },
  {
    "topic": "Should shoppers choose more reusable household items?",
    "points": [
      "Shopping",
      "Environment",
      "Community"
    ],
    "model": "I think shoppers should choose more reusable household items. I have two reasons. First, one durable product can replace many disposable ones. This can make everyday life easier and give people more useful choices. Second, families may save money over time. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe shoppers should choose more reusable household items."
  },
  {
    "topic": "Should cities provide free public Wi-Fi?",
    "points": [
      "City",
      "Access",
      "Community"
    ],
    "model": "I think cities should provide free public Wi-Fi. I have two reasons. First, people can access important information outside their homes. This can make everyday life easier and give people more useful choices. Second, visitors can use maps and transportation services easily. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should provide free public Wi-Fi."
  },
  {
    "topic": "Should cities provide more benches?",
    "points": [
      "City",
      "Access",
      "Community"
    ],
    "model": "I think cities should provide more benches. I have two reasons. First, older people and families need places to rest. This can make everyday life easier and give people more useful choices. Second, comfortable streets encourage walking. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should provide more benches."
  },
  {
    "topic": "Should cities provide night buses?",
    "points": [
      "City",
      "Access",
      "Community"
    ],
    "model": "I think cities should provide night buses. I have two reasons. First, workers and students can travel safely after late activities. This can make everyday life easier and give people more useful choices. Second, fewer people will need to drive at night. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should provide night buses."
  },
  {
    "topic": "Should cities provide car-free streets on weekends?",
    "points": [
      "City",
      "Access",
      "Community"
    ],
    "model": "I think cities should provide car-free streets on weekends. I have two reasons. First, pedestrians can move safely. This can make everyday life easier and give people more useful choices. Second, shops and events may attract more visitors. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should provide car-free streets on weekends."
  },
  {
    "topic": "Should cities provide public study rooms?",
    "points": [
      "City",
      "Access",
      "Community"
    ],
    "model": "I think cities should provide public study rooms. I have two reasons. First, students need quiet places outside school. This can make everyday life easier and give people more useful choices. Second, shared rooms can offer internet access and useful equipment. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe cities should provide public study rooms."
  },
  {
    "topic": "Do you think electric buses will become more common?",
    "points": [
      "Future",
      "Technology",
      "Society"
    ],
    "model": "I think electric buses will become more common. I have two reasons. First, cities need cleaner public transportation. This can make everyday life easier and give people more useful choices. Second, battery technology continues to improve. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe electric buses will become more common."
  },
  {
    "topic": "Do you think online medical consultations will become more common?",
    "points": [
      "Future",
      "Technology",
      "Society"
    ],
    "model": "I think online medical consultations will become more common. I have two reasons. First, patients can speak to doctors without long trips. This can make everyday life easier and give people more useful choices. Second, video technology is becoming easier to use. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe online medical consultations will become more common."
  },
  {
    "topic": "Do you think shared offices will become more common?",
    "points": [
      "Future",
      "Technology",
      "Society"
    ],
    "model": "I think shared offices will become more common. I have two reasons. First, many workers need a desk only a few days each week. This can make everyday life easier and give people more useful choices. Second, shared spaces can cost less than private offices. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe shared offices will become more common."
  },
  {
    "topic": "Do you think smart home devices will become more common?",
    "points": [
      "Future",
      "Technology",
      "Society"
    ],
    "model": "I think smart home devices will become more common. I have two reasons. First, people want to save energy automatically. This can make everyday life easier and give people more useful choices. Second, devices are becoming simpler and less expensive. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe smart home devices will become more common."
  },
  {
    "topic": "Do you think translation tools will become more common?",
    "points": [
      "Future",
      "Technology",
      "Society"
    ],
    "model": "I think translation tools will become more common. I have two reasons. First, more people communicate internationally. This can make everyday life easier and give people more useful choices. Second, software can already translate speech quickly. It can also create long-term benefits for individuals and society. It would encourage people to make thoughtful choices in daily life. Of course, careful planning is necessary, but most problems can be reduced with clear rules. For these reasons, I believe translation tools will become more common."
  }

];

const $ = (selector) => document.querySelector(selector);
let modelOpen = false;
const savedWriting = window.EikenProgress.read().writing || {};
const drafts = { ...(savedWriting.drafts || {}) };
const gradeResults = { ...(savedWriting.gradeResults || {}) };
let activePromptIndex = Math.min(Math.max(Number(savedWriting.promptIndex) || 0, 0), prompts.length - 1);

$("#promptSelect").innerHTML = prompts.map((_, index) => `<option value="${index}">お題 ${index + 1}</option>`).join("");
$("#promptSelect").value = String(activePromptIndex);

function saveWritingProgress() {
  drafts[activePromptIndex] = $("#essay").value;
  const completedDrafts = Object.values(drafts).filter((draft) => draft.trim()).length;
  window.EikenProgress.updateSection(
    "writing",
    { promptIndex: activePromptIndex, drafts, gradeResults },
    {
      href: "writing.html?resume=1",
      title: "ライティングの続き",
      detail: `お題 ${activePromptIndex + 1}・下書き${completedDrafts}題保存`
    }
  );
}

function loadPrompt() {
  activePromptIndex = Number($("#promptSelect").value);
  const prompt = prompts[activePromptIndex];
  $("#writingTopic").textContent = prompt.topic;
  $("#writingPoints").innerHTML = prompt.points.map((point) => `<li>${point}</li>`).join("");
  $("#modelText").textContent = prompt.model;
  $("#essay").value = drafts[activePromptIndex] || "";
  modelOpen = false;
  $("#modelAnswer").hidden = true;
  $("#modelToggle").textContent = "模範解答を見る";
  count();
  showSavedGrade();
  saveWritingProgress();
}

function count() {
  const text = $("#essay").value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  $("#wordCount").textContent = `${words} words`;
  $("#countGuide").textContent = words < 80 ? `あと${80 - words}語で目標に到達` : words <= 100 ? "目標語数に達しています" : `目標より${words - 100}語多いです`;
  $("#countGuide").className = words >= 80 && words <= 100 ? "count-guide on-target" : "count-guide";
}

$("#promptSelect").addEventListener("change", loadPrompt);
$("#essay").addEventListener("input", () => {
  count();
  showSavedGrade(true);
  saveWritingProgress();
});
$("#modelToggle").addEventListener("click", () => {
  modelOpen = !modelOpen;
  $("#modelAnswer").hidden = !modelOpen;
  $("#modelToggle").textContent = modelOpen ? "模範解答を閉じる" : "模範解答を見る";
});

const criterionLabels = {
  content: "内容",
  organization: "構成",
  vocabulary: "語彙",
  grammar: "文法",
};

function setGradingStatus(message = "", type = "") {
  const status = $("#gradingStatus");
  status.textContent = message;
  status.className = `grading-status${type ? ` ${type}` : ""}`;
}

function appendTextElement(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function renderGrade(result) {
  $("#gradingTotal").textContent = String(result.total);
  $("#gradingOverview").textContent = result.overview;

  const breakdown = $("#gradingBreakdown");
  breakdown.replaceChildren();
  Object.entries(criterionLabels).forEach(([key, label]) => {
    const item = document.createElement("article");
    item.className = "criterion-card";
    const head = document.createElement("div");
    appendTextElement(head, "strong", "", label);
    appendTextElement(head, "span", "criterion-score", `${result[key].score} / 4`);
    item.appendChild(head);
    appendTextElement(item, "p", "", result[key].comment);
    breakdown.appendChild(item);
  });

  const advice = $("#gradingAdvice");
  advice.replaceChildren();
  result.advice.forEach((item) => appendTextElement(advice, "li", "", item));

  const corrections = $("#gradingCorrections");
  corrections.replaceChildren();
  $("#correctionsSection").hidden = result.corrections.length === 0;
  result.corrections.forEach((correction) => {
    const item = document.createElement("article");
    item.className = "correction-item";
    appendTextElement(item, "p", "correction-original", correction.original);
    appendTextElement(item, "p", "correction-fixed", correction.corrected);
    appendTextElement(item, "small", "", correction.reason);
    corrections.appendChild(item);
  });

  $("#improvedEssay").textContent = result.improved_essay;
  $("#gradingPanel").hidden = false;
}

function showSavedGrade(edited = false) {
  const saved = gradeResults[activePromptIndex];
  const essay = $("#essay").value.trim();
  if (saved && saved.gradedEssay === essay) {
    renderGrade(saved);
    if (!edited) setGradingStatus("前回の採点結果を表示しています。", "success");
    return;
  }

  $("#gradingPanel").hidden = true;
  if (edited && saved) {
    setGradingStatus("解答を編集したため、もう一度採点できます。", "");
  } else {
    setGradingStatus();
  }
}

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "because", "but", "by", "can", "do", "for", "from",
  "has", "have", "he", "her", "his", "i", "if", "in", "is", "it", "its", "may", "more", "my", "not",
  "of", "on", "or", "our", "people", "should", "so", "some", "that", "the", "their", "them", "they",
  "this", "to", "use", "we", "when", "which", "will", "with", "would", "you", "your"
]);

const topicStopWords = new Set([
  ...stopWords, "think", "future", "students", "schools", "cities", "companies", "workplaces", "shoppers"
]);

const usefulVocabulary = new Set([
  "advantage", "afford", "although", "benefit", "community", "convenient", "develop", "effective", "efficient",
  "environment", "experience", "flexible", "furthermore", "however", "improve", "independent", "instead", "moreover",
  "opportunity", "pollution", "prevent", "provide", "reduce", "responsibility", "therefore", "valuable", "various"
]);

const commonMisspellings = {
  becouse: "because", beacause: "because", goverment: "government", enviroment: "environment",
  comunity: "community", convienient: "convenient", diffrent: "different", importent: "important",
  neccesary: "necessary", necesary: "necessary", oportunity: "opportunity", responsability: "responsibility",
  recieve: "receive", seperate: "separate", tecnology: "technology", thier: "their", wich: "which",
  alot: "a lot", benifit: "benefit", developement: "development", studens: "students"
};

function essayWords(text) {
  return (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []);
}

function essaySentences(text) {
  return (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function cleanEssay(essay) {
  let fixed = essay.trim().replace(/[ \t]+/g, " ").replace(/\s+([,.!?])/g, "$1");
  const corrections = [];
  const addCorrection = (original, corrected, reason) => {
    if (original === corrected || corrections.length >= 6) return;
    if (corrections.some((item) => item.original === original && item.corrected === corrected)) return;
    corrections.push({ original, corrected, reason });
  };

  fixed = fixed.replace(/\bi\b/g, (match) => {
    addCorrection(match, "I", "一人称の I は大文字で書きます。");
    return "I";
  });

  Object.entries(commonMisspellings).forEach(([wrong, right]) => {
    const pattern = new RegExp(`\\b${wrong}\\b`, "gi");
    fixed = fixed.replace(pattern, (match) => {
      const replacement = /^[A-Z]/.test(match) ? right[0].toUpperCase() + right.slice(1) : right;
      addCorrection(match, replacement, "つづりを確認しましょう。");
      return replacement;
    });
  });

  const grammarRules = [
    [/\b(I) (?:is|are)\b/gi, "$1 am", "I の後は am を使います。"],
    [/\b(I) has\b/gi, "$1 have", "I の後は have を使います。"],
    [/\b(he|she|it) have\b/gi, "$1 has", "三人称単数では has を使います。"],
    [/\b(he|she|it) do not\b/gi, "$1 does not", "三人称単数では does not を使います。"],
    [/\b(people|students|they|we) is\b/gi, "$1 are", "複数の主語には are を使います。"],
    [/\b(people|students|they|we) has\b/gi, "$1 have", "複数の主語には have を使います。"],
    [/\b([a-z]+)\s+\1\b/gi, "$1", "同じ単語が続いています。"]
  ];

  grammarRules.forEach(([pattern, replacement, reason]) => {
    fixed = fixed.replace(pattern, (match, group) => {
      const corrected = replacement.replace("$1", group);
      addCorrection(match, corrected, reason);
      return corrected;
    });
  });

  fixed = fixed.replace(/(^|[.!?]\s+)([a-z])/g, (match, prefix, letter) => {
    const corrected = `${prefix}${letter.toUpperCase()}`;
    addCorrection(match.trim(), corrected.trim(), "文の最初は大文字で始めます。");
    return corrected;
  });

  if (fixed && !/[.!?]$/.test(fixed)) {
    const finalWords = fixed.split(/\s+/).slice(-5).join(" ");
    addCorrection(finalWords, `${finalWords}.`, "文末にピリオドなどを付けます。");
    fixed += ".";
  }

  return { fixed, corrections };
}

function analyzeEssay(essay, prompt) {
  const lower = essay.toLowerCase();
  const words = essayWords(essay);
  const sentences = essaySentences(essay);
  const wordTotal = words.length;
  const { fixed, corrections } = cleanEssay(essay);

  const stance = /\b(i (?:think|believe|feel|agree|disagree)|in my opinion|from my point of view)\b/i.test(essay);
  const firstReason = /\b(first(?:ly)?|one reason|to begin with)\b/i.test(essay);
  const secondReason = /\b(second(?:ly)?|another reason|in addition)\b/i.test(essay);
  const becauseCount = countMatches(lower, /\b(because|since|for example|for instance)\b/g);
  const reasonCount = (firstReason ? 1 : 0) + (secondReason ? 1 : 0) + Math.min(becauseCount, 2);
  const conclusion = /\b(for these reasons|therefore|in conclusion|to conclude|overall|that is why|thus)\b/i.test(essay);
  const connectorCount = countMatches(lower, /\b(first|firstly|second|secondly|also|however|although|moreover|furthermore|therefore|because|for example|for instance|in addition|on the other hand|as a result)\b/g);

  const topicKeywords = essayWords(prompt.topic).filter((word) => word.length > 3 && !topicStopWords.has(word));
  const pointKeywords = prompt.points.flatMap((point) => essayWords(point));
  const topicHits = topicKeywords.filter((word) => words.includes(word)).length;
  const pointHits = pointKeywords.filter((word) => words.includes(word)).length;
  const relevant = topicHits > 0 || pointHits > 0;

  const contentBaseScore = Math.min(4,
    (stance ? 1 : 0) +
    (reasonCount >= 2 ? 2 : reasonCount >= 1 ? 1 : 0) +
    (relevant ? 1 : 0)
  );
  const contentScore = wordTotal < 60 ? Math.min(contentBaseScore, 2) : wordTotal < 80 ? Math.min(contentBaseScore, 3) : contentBaseScore;

  const organizationBaseScore = Math.min(4,
    (stance ? 1 : 0) +
    (firstReason && secondReason ? 1 : 0) +
    (conclusion ? 1 : 0) +
    (connectorCount >= 3 || sentences.length >= 5 ? 1 : 0)
  );
  const organizationScore = wordTotal < 60 ? Math.min(organizationBaseScore, 3) : organizationBaseScore;

  const contentWords = words.filter((word) => word.length > 2 && !stopWords.has(word));
  const uniqueContent = new Set(contentWords);
  const uniqueRatio = contentWords.length ? uniqueContent.size / contentWords.length : 0;
  const frequencies = contentWords.reduce((map, word) => {
    map[word] = (map[word] || 0) + 1;
    return map;
  }, {});
  const highestFrequency = Math.max(0, ...Object.values(frequencies));
  const advancedCount = [...uniqueContent].filter((word) =>
    usefulVocabulary.has(word) || word.length >= 9 || /(?:tion|ment|ity|ive|ous|ally)$/.test(word)
  ).length;
  const vocabularyBaseScore = Math.min(4,
    (wordTotal >= 20 ? 1 : 0) +
    (uniqueRatio >= 0.58 ? 1 : 0) +
    (advancedCount >= 3 ? 1 : 0) +
    (uniqueContent.size >= 18 && highestFrequency <= 3 ? 1 : 0)
  );
  const vocabularyScore = wordTotal < 60 ? Math.min(vocabularyBaseScore, 3) : vocabularyBaseScore;

  const longSentences = sentences.filter((sentence) => essayWords(sentence).length > 35).length;
  const fragments = sentences.filter((sentence) => essayWords(sentence).length < 3).length;
  const grammarIssues = corrections.length + longSentences + fragments;
  const grammarScore = grammarIssues === 0 ? 4 : grammarIssues === 1 ? 3 : grammarIssues <= 3 ? 2 : grammarIssues <= 5 ? 1 : 0;

  const total = contentScore + organizationScore + vocabularyScore + grammarScore;
  const advice = [];
  if (contentScore < 4) advice.push(reasonCount < 2 ? "自分の意見に加えて、異なる理由を2つ具体的に説明しましょう。" : "TOPICやPOINTSに直接つながる具体例を1つ加えましょう。");
  if (organizationScore < 4) advice.push(!conclusion ? "最後に For these reasons などを使って意見をまとめましょう。" : "First、Second、However などで文同士の関係を明確にしましょう。");
  if (vocabularyScore < 4) advice.push("同じ単語の繰り返しを避け、授業で学んだ英検2級語彙に言い換えましょう。");
  if (grammarScore < 4) advice.push("自動検出された箇所に加え、主語と動詞・単数複数・時制を音読して確認しましょう。");
  if (advice.length < 2) advice.push("理由ごとに短い具体例を加えると、より説得力が上がります。");
  if (advice.length < 2) advice.push("模範解答と比べ、使えそうな接続表現を1つ取り入れましょう。");

  const wordMessage = wordTotal < 80
    ? `現在${wordTotal}語です。目標まであと${80 - wordTotal}語あります。`
    : wordTotal <= 100
      ? `現在${wordTotal}語で、目標語数に収まっています。`
      : `現在${wordTotal}語です。重要な内容を残して${wordTotal - 100}語ほど減らしましょう。`;
  const levelMessage = total >= 14
    ? "4観点がよくそろった答案です。"
    : total >= 11
      ? "英検2級らしい形ができています。弱い観点を1つ直すとさらに伸びます。"
      : total >= 8
        ? "基本の形はできています。理由とつなぎ言葉を増やしましょう。"
        : "意見・理由2つ・まとめの順に書き直すと得点しやすくなります。";

  return {
    content: {
      score: contentScore,
      comment: `${stance ? "意見あり" : "明確な意見表現が必要"}・理由${Math.min(reasonCount, 2)}個・POINTS関連語${pointHits}個を確認しました。`
    },
    organization: {
      score: organizationScore,
      comment: `つなぎ言葉${connectorCount}個、${conclusion ? "まとめ表現あり" : "まとめ表現なし"}、${sentences.length}文を確認しました。`
    },
    vocabulary: {
      score: vocabularyScore,
      comment: `内容語${contentWords.length}語のうち${uniqueContent.size}種類、発展語彙の目安${advancedCount}語を確認しました。`
    },
    grammar: {
      score: grammarScore,
      comment: grammarIssues === 0 ? "機械的に検出できる基本的な誤りは見つかりませんでした。" : `表記・基本文法・文の長さについて${grammarIssues}件の注意点を検出しました。`
    },
    total,
    overview: `${levelMessage} ${wordMessage}`,
    corrections,
    improved_essay: fixed,
    advice: advice.slice(0, 3),
    method: "local-v1"
  };
}

$("#gradeWriting").addEventListener("click", () => {
  const essay = $("#essay").value.trim();
  const words = essay ? essay.split(/\s+/).length : 0;
  if (words < 20) {
    setGradingStatus("採点するには20語以上入力してください。", "error");
    return;
  }

  const requestIndex = activePromptIndex;
  const prompt = prompts[requestIndex];
  const button = $("#gradeWriting");
  button.disabled = true;
  button.textContent = "分析中…";
  setGradingStatus("端末内で4つの観点を分析しています。", "loading");

  const result = analyzeEssay(essay, prompt);
  gradeResults[requestIndex] = { ...result, gradedEssay: essay };
  saveWritingProgress();
  renderGrade(gradeResults[requestIndex]);
  setGradingStatus("無料採点が完了しました。通信や料金は発生していません。", "success");
  button.disabled = false;
  button.textContent = "無料で採点する";
  $("#gradingPanel").scrollIntoView({ behavior: "smooth", block: "start" });
});

loadPrompt();
