import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../context/API";

const PlaySimulations = () => {
  const [options, setOptions] = useState([]);
  const [disaster, setDisaster] = useState(null);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const { simulasiId } = useParams();

  useEffect(() => {
    API.getSimulationsDetails(simulasiId).then((data) => {
      setDisaster(data);
    });
    API.getSimulationsOptions(simulasiId).then((data) => {
      setOptions(data);
    });
  }, [simulasiId]);

  const handleNextOption = (nextOptionId) => {
    // Find the index of the selected nextOption based on its _id
    const nextOptionIndex = options.findIndex(
      (option) => option._id === nextOptionId
    );

    if (nextOptionIndex !== -1) {
      setCurrentOptionIndex(nextOptionIndex);
    } else {
      // Handle the case where the selected nextOption is not found.
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col">
        {disaster ? (
          <div className="w-full">
            <h1>{disaster.disasterTitle}</h1>
            <p>{disaster.disasterDescription}</p>

            {currentOptionIndex < options.length ? (
              <div>
                <h2>Choose an option:</h2>
                <div>{options[currentOptionIndex].optionTextOutcome}</div>
                {/* <div className="w-full border border-black">
                  <Typewriter
                    text={options[currentOptionIndex].optionTextOutcome}
                    delay={40}
                    infinite
                  />
                </div> */}

                {options[currentOptionIndex].optionPictureOutcome && (
                  <img
                    src={`http://localhost:5000/images/outcome/${options[currentOptionIndex].optionPictureOutcome}`}
                    alt="Outcome"
                    width={`80px`}
                    className="border border-black"
                  />
                )}

                {options[currentOptionIndex].nextOptions.length > 0 ? (
                  <div>
                    {options[currentOptionIndex].nextOptions.map(
                      (nextOption) => (
                        <button
                          key={nextOption._id}
                          onClick={() => handleNextOption(nextOption._id)}
                        >
                          {nextOption.optionText}
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      handleNextOption(options[currentOptionIndex + 1]._id)
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            ) : (
              <p>No more options available.</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default PlaySimulations;
