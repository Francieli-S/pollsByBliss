import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DetailScreen() {
  const [questionDetails, setQuestionsDetails] = useState();

  const question_id = 3;

  const axiosDetails = async () => {
    try {
      const response = await axios.get(
        `https://private-anon-1212ecd341-blissrecruitmentapi.apiary-mock.com/questions/${question_id}`
      );
      if (response.status === 200) {
        setQuestionsDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosDetails();
  }, [questionDetails]);

  const handleUpdate = async (e) => {
    const option = e.target.name

    questionDetails.choices.find(choice => {
      if (choice.choice === option) {
        choice.votes++
      }
    })
    console.log('updateddd', questionDetails.choices)
    try {
      const body = {
        ...questionDetails
      } 
      const response = await axios.put(`https://private-anon-f3fe99d5da-blissrecruitmentapi.apiary-mock.com/questions/${question_id}`, body)
      console.log('UPDATING', response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
            {choice.choice} - {choice.votes} votes
            <button type='button' name={choice.choice} onClick={handleUpdate}>
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading Screen...</div>
  );
}
