import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>

      <p>
        Hi, I am{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500 inline-block">
          {profile?.user?.name || "Vivek Kumar"}
        </strong>
        , a passionate and dedicated Full Stack Developer with a strong
        foundation in software development and problem-solving. I enjoy building
        scalable, responsive, and user-friendly web applications while
        continuously improving my technical skills and learning new
        technologies.
      </p>

      {/* TECHNICAL SKILLS */}
      <h2 className="font-semibold text-blue-800 text-xl">Technical Skills</h2>

      <p>
        <strong>Languages :</strong> C, Java, Python, JavaScript
        <br />
        <strong>Core Skills :</strong> Data Structures & Algorithms (DSA),
        Object-Oriented Programming (OOPs), Problem Solving
        <br />
        <strong>Database :</strong> SQLite, MySQL, MongoDB
        <br />
        <strong>Web Technologies :</strong> Express.js, React.js, Node.js,
        Tailwind CSS, JWT, REST API
        <br />
        <strong>Tools / Others :</strong> Git, GitHub, Postman, Thunder Client,
        VS Code, PyCharm, IntelliJ IDEA
      </p>

      {/* CERTIFICATIONS */}
      <h2 className="font-semibold text-blue-800 text-xl">Certifications</h2>

      <p>
        <strong>Certificate of Completion</strong> | Co-founder: Shradha Khapra
        <br />
        United Latino Students Association
        <br />
        <strong>Credential ID:</strong> 659e5afc7fa67ec97205fc76
        <br />
        <strong>Issued:</strong> September 2024
        <br />◆ Web Development (Full Stack Web Development)
      </p>

      {/* PERSONAL INTERESTS */}
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests & Motivation
      </h2>

      <p>
        Outside of development, cricket plays an important role in shaping my
        mindset. The game has taught me discipline, patience, and the value of
        consistent effort—qualities that strongly reflect in my approach to
        coding and problem-solving. Observing legendary players like{" "}
        <strong>Virat Kohli</strong> inspires me to stay focused, embrace
        challenges, and continuously improve both on and off the field.
      </p>
    </div>
  );
}

export default About;
