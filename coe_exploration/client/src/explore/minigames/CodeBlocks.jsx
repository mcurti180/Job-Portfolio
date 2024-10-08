import React from 'react';

const Question1 = ({ handleWordClick }) => (
    <div>
        <pre>
            {           
`def sum(a, b):
    a + b = c
    return` }<span onClick={() =>handleWordClick("return c")}> a</span>
            </pre>
            <pre>{
            `   result = sum(3, 4)`}
        </pre>
    </div>
  );
  
const Question2 = ({ handleWordClick }) => (
    <div>
        <pre>
            {           
`def sum(a, b):
    a + b = c
    return c

    result = sum(3, 4)
    print(`}<span onClick={() =>handleWordClick("print(result)")}> "result"</span>)
        </pre>
    </div>
);
  
const Question3 = ({ handleWordClick }) => (
    <div>
        <pre>
            {           
`def sum(a, b):
    a + b = c
    return c

    result = sum(3, 4)
    result2 = sum(5, 8)
    result3 = sum(result`}<span onClick={() =>handleWordClick("result3 = sum(result, result 2)")}> </span>result2)
        </pre>

        <pre>
{`  print(result3)`}
        </pre>
    
    </div>
);

const Reward = () => (
    <div>
        You win!
    </div>
);

  export { Question1, Question2, Question3, Reward };