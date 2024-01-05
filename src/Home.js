// Home.js
import React from "react";
import Afsana from "./assets/Afsana.jpeg";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import "./components/Home.css";

const ProjectCard = ({ project, index, moveProject }) => {
  const [, drag] = useDrag({
    type: "PROJECT",
    item: { project },
  });

  const [, drop] = useDrop({
    accept: "PROJECT",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveProject(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={drag} className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-icons">
        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

function Home() {
  const projects = [
    {
      title: "Project 1",
      description: "Simple Dice Roll Game - Refresh to play!",
      projectLink: "https://afsana16063.github.io/DiceChallenge/",
      githubLink: "https://github.com/afsana16063/DiceChallenge",
    },
    {
      title: "Project 2",
      description: "The game ends when someone is 100!",
      projectLink: "https://afsana16063.github.io/Pig-Game/",
      githubLink: "https://github.com/afsana16063/Pig-Game",
    },
    {
      title: "Project 3",
      description: "Description of Project 3",
      projectLink: "https://afsana16063.github.io/Drum-Kit/",
      githubLink: "https://github.com/afsana16063/Drum-Kit",
    },
  ];

  const moveProject = (fromIndex, toIndex) => {
    const updatedProjects = [...projects];
    const [movedProject] = updatedProjects.splice(fromIndex, 1);
    updatedProjects.splice(toIndex, 0, movedProject);

    // Update state or dispatch an action to update state
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="general-information">
          <div className="about-me">
            <h3>I am Afsana Mammadova</h3>
            <p>
              Driven and enthusiastic student with a genuine passion for
              start-ups, coupled with a relentless pursuit of academic
              excellence. Embraces learning with joy, demonstrating exceptional
              communication and leadership abilities. Actively seeks growth
              opportunities, aiming to make a positive impact through continuous
              personal and professional development.
            </p>
            <div className="links links_home">
              <a
                href="https://github.com/afsana16063"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/afsana-mammadova-322525238/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.youtube.com/channel/UC79-BuG1ZDu9LwpVsZ6_Wbg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="img">
            <img src={Afsana} width={600}></img>
          </div>
        </div>
        <div className="portfolio">
          <h1>My Projects</h1>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </>
    </DndProvider>
  );
}

export default Home;
