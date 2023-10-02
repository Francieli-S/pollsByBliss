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
        `https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=${filter}`        
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
      <ol>
        {questionsList.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ol>
    </div>
  );
}
