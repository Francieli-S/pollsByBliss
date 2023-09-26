import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DetailScreen() {
  const [questionDetails, setQuestionsDetails] = useState();

  const question_id = 1;

  const axiosDetails = async () => {
    try {
      const response = await axios.get(
        `https://private-anon-1212ecd341-blissrecruitmentapi.apiary-mock.com/questions/${question_id}`
      );
      console.log(response.status);
      if (response.status === 200) {
        console.log('DETAIL', response.data);
        setQuestionsDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosDetails();
  }, [question_id]);

  return questionDetails ? (
    <div>
      <img
        src={questionDetails.image_url}
        alt='picture related to question content'
      />
      <h1>Question: {questionDetails.question}</h1>
      <p>Published: {questionDetails.published_at}</p>
      <ul>
        {questionDetails.choices.map((choice, i) => (
          <li key={choice[i]}>
            Language: {choice.choice} Votes: {choice.votes}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading Screen...</div>
  );
}
