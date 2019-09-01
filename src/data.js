export default {
  projects: [
    {
      name: `Routine`,
      desc: `It is never possible to settle down to the ordinary routine of life at sea until the screw begins to revolve. There is an hour or two, after the passengers have embarked, which is disquieting and fussy.`,
      create: `2019/04/25`
    },
    {
      name: `Study`,
      desc: `The effort to acquire knowledge, as by reading, observation, or research`,
      create: `2019/04/25`
    },
    {
      name: `V-OS`,
      desc: `This site acts as a hub for a collection of multimedia experiments, narrative explorations, and philosophical investigations. V-OS focuses on providing a space to create and document fictional worlds made real through experimental media projects, in an attempt create and study a series of realities.`,
      create: `2019/04/25`
    },
    {
      name: `Purity`,
      desc: `Purity is a specialized wiki engine built in PHP, with the purpose of creating a minimalistic platform for complex, interwoven networks of data.`,
      create: `2019/04/25`
    },
    {
      name: `Sport`,
      desc: `Sport or sports includes all forms of competitive physical activity or games which, through casual or organised participation, aim to use, maintain or improve physical ability and skills while providing enjoyment to participants, and in some cases, entertainment for spectators.`,
      create: `2019/04/25`
    },
    {
      name: `Japan`,
      desc: `Japan is a sovereign island country in East Asia. Located in the Pacific Ocean, it lies off the eastern coast of the Asian mainland and stretches from the Sea of Okhotsk in the north to the East China Sea and China in the southwest.`,
      create: `2019/04/25`
    },
    {
      name: `Jam`,
      desc: `The Jam's music still means something to people and a lot of that's because we stopped at the right time, it didn't go on and become embarrassing." From The Jam toured the UK in late 2007, finishing with a concert at Brighton Centre on 21 December 2007 to mark the 25th anniversary of The Jam's final show.`,
      create: `2019/04/25`
    },
    {
      name: `Tinker`,
      desc: `Tinker or tinkerer is an archaic term used to describe an itinerant tinsmith who mends household utensils.`,
      create: `2019/04/25`
    },
    {
      name: `Doodle`,
      desc: `A doodle is a drawing made while a person's attention is otherwise occupied. Doodles are simple drawings that can have concrete representational meaning or may just be composed of random and abstract lines, generally without ever lifting the drawing device from the paper, in which case it is usually called a "scribble".`,
      create: `2019/04/25`
    }
  ],
  divisions: [
    { name: `Abstract`, desc: `Design, and the Intangible` },
    { name: `Code`, desc: `Systems, Coding, and Tech` },
    { name: `Visual`, desc: `Graphics, Video, and Images` },
    { name: `Audio`, desc: `Music and Audio` },
    { name: `Personal`, desc: `Personal Matters and Physical Activities` },
    { name: `None`, desc: `Nothing` }
  ],
  types: [
    { name: `Design`, desc: `Project Planning, Research, and Organization` },
    { name: `Development`, desc: `Programming, Testing, Math, and Debugging` },
    {
      name: `Writing`,
      desc: `Narrative, Research, Documentation, and Communication`
    },
    { name: `Linguistics`, desc: `Language Development` },
    { name: `Graphic`, desc: `2D Graphic Development` },
    { name: `Illustration`, desc: `Drawing` },
    { name: `3D`, desc: `Generation, Animation, Lighting, and Rendering` },
    { name: `Modeling`, desc: `Modeling, Sculpting, Rigging, Texturing` },
    { name: `Videography`, desc: `Video Filming and Editing` },
    { name: `Photography`, desc: `Picture Taking and Editing` },
    { name: `Composition`, desc: `Composing, Producing, and Mixing` },
    { name: `Acoustic`, desc: `Instrument Play and Recording` },
    { name: `Performance`, desc: `Audio and Visual Performance` },
    { name: `Research`, desc: `Learning, Testing, Studying, and Teaching` },
    { name: `Maintenance`, desc: `Personal Organization and Maintenance` },
    { name: `Event`, desc: `Noteworthy Event` },
    { name: `None`, desc: `Nothing` }
  ],
  tasks: [
    { id: 1, name: `Document routines.`, project: `Routine` },
    { id: 2, name: `Creative writing.`, project: `Study` },
    { id: 3, name: `Syntax.`, project: `Study` },
    {
      id: 4,
      name: `Add artifact timestamp and recent activities sorting.`,
      project: `V-OS`
    },
    { id: 5, name: `Add artifact timestamp.`, project: `Purity` },
    { id: 6, name: `Game studies.`, project: `Study` },
    { id: 7, name: `Gymnastics.`, project: `Sport` },
    { id: 8, name: `Kanji.`, project: `Japan` },
    { id: 9, name: `Composition practice.`, project: `Jam` },
    { id: 10, name: `Japanese.`, project: `Japan` },
    { id: 11, name: `Guitar teaching.`, project: `Jam` },
    { id: 12, name: `Web programming teaching.`, project: `Tinker` },
    { id: 13, name: `Corporate programming careers.`, project: `Study` },
    { id: 14, name: `Long-term online game maintenance.`, project: `Study` },
    { id: 15, name: `Picture taking and editing.`, project: `Doodle` }
  ],
  tracker: [
    {
      date: `2019/07/16`,
      time: 0.5,
      project: `Routine`,
      type: `Design`,
      divisions: `Personal`,
      task: `Document routines.`
    },
    {
      date: `2019/07/16`,
      time: 1.5,
      project: `Study`,
      type: `Writing`,
      divisions: `Abstract`,
      task: `Creative writing.`
    },
    {
      date: `2019/07/16`,
      time: 0.5,
      project: `Study`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Syntax.`
    },
    {
      date: `2019/07/16`,
      time: 1.0,
      project: `V-OS`,
      type: `Development`,
      divisions: `Code`,
      task: `Add artifact timestamp and recent activities sorting.`
    },
    {
      date: `2019/07/16`,
      time: 0.5,
      project: `Purity`,
      type: `Development`,
      divisions: `Code`,
      task: `Add artifact timestamp.`
    },
    {
      date: `2019/07/16`,
      time: 1.5,
      project: `Study`,
      type: `Research`,
      divisions: `Abstract`,
      task: `Game studies.`
    },
    {
      date: `2019/07/15`,
      time: 1.5,
      project: `Sport`,
      type: `Research`,
      divisions: `Personal`,
      task: `Gymnastics.`
    },
    {
      date: `2019/07/15`,
      time: 1.5,
      project: `Japan`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Kanji.`
    },
    {
      date: `2019/07/14`,
      time: 2.0,
      project: `Jam`,
      type: `Composition`,
      divisions: `Audio`,
      task: `Composition practice.`
    },
    {
      date: `2019/07/14`,
      time: 1.5,
      project: `Sport`,
      type: `Research`,
      divisions: `Personal`,
      task: `Gymnastics`
    },
    {
      date: `2019/07/13`,
      time: 1.0,
      project: `Jam`,
      type: `Composition`,
      divisions: `Audio`,
      task: `Composition practice.`
    },
    {
      date: `2019/07/13`,
      time: 1.5,
      project: `Sport`,
      type: `Research`,
      divisions: `Personal`,
      task: `Gymnastics.`
    },
    {
      date: `2019/07/12`,
      time: 0.5,
      project: `Study`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Syntax.`
    },
    {
      date: `2019/07/12`,
      time: 3.0,
      project: `Japan`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Japanese.`
    },
    {
      date: `2019/07/11`,
      time: 0.5,
      project: `Jam`,
      type: `Acoustic`,
      divisions: `Audio`,
      task: `Guitar teaching.`
    },
    {
      date: `2019/07/11`,
      time: 1.5,
      project: `Tinker`,
      type: `Development`,
      divisions: `Code`,
      task: `Web programming teaching.`
    },
    {
      date: `2019/07/11`,
      time: 2.0,
      project: `Study`,
      type: `Writing`,
      divisions: `Abstract`,
      task: `Creative writing.`
    },
    {
      date: `2019/07/10`,
      time: 1.0,
      project: `Jam`,
      type: `Acoustic`,
      divisions: `Audio`,
      task: `Guitar teaching.`
    },
    {
      date: `2019/07/09`,
      time: 1.5,
      project: `Jam`,
      type: `Acoustic`,
      divisions: `Audio`,
      task: `Guitar teaching.`
    },
    {
      date: `2019/07/09`,
      time: 1.0,
      project: `Study`,
      type: `Research`,
      divisions: `Abstract`,
      task: `Corporate programming careers.`
    },
    {
      date: `2019/07/09`,
      time: 1.5,
      project: `Study`,
      type: `Research`,
      divisions: `Abstract`,
      task: `Game studies.`
    },
    {
      date: `2019/07/08`,
      time: 1.5,
      project: `Japan`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Kanji.`
    },
    {
      date: `2019/07/07`,
      time: 0.5,
      project: `Japan`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Kanji.`
    },
    {
      date: `2019/07/07`,
      time: 1.0,
      project: `Study`,
      type: `Research`,
      divisions: `Abstract`,
      task: `Long-term online game maintenance.`
    },
    {
      date: `2019/07/06`,
      time: 1.0,
      project: `Study`,
      type: `Research`,
      divisions: `Abstract`,
      task: `Long-term online game maintenance.`
    },
    {
      date: `2019/07/05`,
      time: 1.5,
      project: `Doodle`,
      type: `Photography`,
      divisions: `Visual`,
      task: `Picture taking and editing.`
    },
    {
      date: `2019/07/05`,
      time: 1.5,
      project: `Study`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Syntax.`
    },
    {
      date: `2019/07/05`,
      time: 1.5,
      project: `Japan`,
      type: `Linguistics`,
      divisions: `Abstract`,
      task: `Japanese.`
    },
    {
      date: `2019/07/04`,
      time: 1.5,
      project: `Study`,
      type: `Writing`,
      divisions: `Abstract`,
      task: `Creative writing.`
    }
  ]
};
