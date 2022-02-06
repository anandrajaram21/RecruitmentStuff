import { useState, useEffect } from 'react';
import { Stack, Box, Text } from '@chakra-ui/react';
import './DadPanel.css';

export default function DadPanel(props) {
  const [joke, setJoke] = useState('');
  const [delivery, setDelivery] = useState('');
  const [nextJoke, setNextJoke] = useState(true);

  const fetchJoke = jokeType => {
    fetch(`https://v2.jokeapi.dev/joke/Pun?type="twopart"`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setJoke(data);
      })
      .then(() => {
        setDelivery('');
      })
      .then(() => {
        setNextJoke(false);
      });
  };

  useEffect(() => {
    fetchJoke(props.jokeType);
  }, []);

  return (
    <Stack direction={'row'} spacing={350}>
      <Box
        backgroundColor={'green.300'}
        padding={'20px'}
        borderRadius="xl"
        width={'150'}
        marginTop="250"
        marginLeft={'150'}
      >
        <Text marginBottom={10} textColor={'black'} fontWeight="semibold">
          {joke.setup}
        </Text>

        <Text textColor={'black'} fontWeight="semibold">
          {delivery}
        </Text>
      </Box>

      <Box>
        <Box
          marginLeft={'300'}
          marginTop="auto"
          className="dadImage face1"
          onClick={e => {
            if (nextJoke === true) {
              fetchJoke(props.jokeType);
              e.currentTarget.classList.add('face1');
              e.currentTarget.classList.remove('face2');
            } else {
              setDelivery(joke.delivery);
              setNextJoke(true);
              e.currentTarget.classList.add('face2');
              e.currentTarget.classList.remove('face1');
            }
          }}
        >
          <Text textAlign={'center'}>Click me!</Text>
        </Box>
      </Box>
    </Stack>
  );
}
