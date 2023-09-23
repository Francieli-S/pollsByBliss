import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ListScreen() {
  const [questionsList, setQuestionsList] = useState([]);

  let limit = questionsList.length;
  let offset = limit;
  let filter = '';

  const axiosQuestions = async () => {
    try {
      const response = await axios.get(
        `https://private-anon-205e1ac56d-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=${filter}`
      );
      if (response.status === 200) {
        setQuestionsList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosQuestions();
  }, []);

  return (
    <div>
      {questionsList.map((question) => (
        <div key={question.id}>
          <h3>
            {question.id} {question.question}
          </h3>
          <ul>
            {question.choices.map((choice, i) => (
              <li key={choice[i]}>
                Language: {choice.choice} Votes: {choice.votes}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
