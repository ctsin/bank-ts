import React, {useEffect, useState, useRef} from 'react';

import styled from 'styled-components/native';

export const Loading = ({size = 6, length = 3, duration = 300}) => {
  const data = Array.from({length});
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => {
    timer.current = setTimeout(function updater() {
      setCurrent((current + 1) % length);

      timer.current = setTimeout(updater, duration);
    }, duration);
    return () => {
      clearTimeout(timer.current);
    };
  }, [current, duration, length]);

  const renderItem = ({index}: {index: number}) => {
    const active = index === current;
    return (
      <Dot
        active={active}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            marginRight: size,
          },
        ]}
      />
    );
  };

  return (
    <Container
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => String(index)}
      extraData={current}
    />
  );
};

const Container = styled.FlatList`
  flex-grow: 0;
`;

type DotProps = {
  active: boolean;
};

const Dot = styled.View<DotProps>`
  background-color: ${({active}) => (active ? 'red' : 'lightgray')};
`;
