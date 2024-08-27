import React, { useState, useEffect } from 'react';

const JoyAtWorkVideoVoting = (props) => {
  const [state, setState] = useState({
    isVoting: true,
    isUserAlreadyVote: false,
    userId: "",
    selectedItemId: 0,
    isVotingResult: false,
    JoyAtWorkVideoVotingListItem: [],
    videoUserVoteListItem: [],
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const isVotingResult = queryParams.get('isVotingResult') === "true";

    setState((prevState) => ({
      ...prevState,
      isVotingResult: isVotingResult,
      isVoting: isVotingResult ? false : prevState.isVoting,
    }));

    // sp.web.currentUser.get().then((user) => {
    //   setState((prevState) => ({
    //     ...prevState,
    //     userId: user?.UserId?.NameId,
    //   }));
    // });

    // // Fetch list data
    // fetchListData(LIST_NAMES.VideoCompetition_list, "JoyAtWorkVideoVotingListItem", setState);
    // fetchUserVoteListData(LIST_NAMES.VideoUserVote_list, "videoUserVoteListItem", setState);
  }, [props.context.pageContext.web.absoluteUrl]);

  const handleSelectedItem = (id) => {
    id = state.videoUserVoteListItem.some(x => x.user_id === state.userId) ? 0 : id;
    setState((prevState) => ({
      ...prevState,
      selectedItemId: id,
    }));
  };

  const submitHandling = async () => {
    try {
      const existingVoteCount = state.JoyAtWorkVideoVotingListItem.find(x => x.Id === state.selectedItemId)?.vote_count;
      const updatedData = {
        vote_count: existingVoteCount ? existingVoteCount + 1 : 1,
      };

    //   await sp.web.lists.getByTitle(LIST_NAMES.VideoCompetition_list).items.getById(state.selectedItemId).update(updatedData);

    //   const updatedJoyAtWorkVideoVotingListItem = state.JoyAtWorkVideoVotingListItem.map(item =>
    //     item.Id === state.selectedItemId
    //       ? { ...item, vote_count: item.vote_count ? item.vote_count + 1 : 1 }
    //       : item
    //   );

    //   if (state.userId) {
    //     const addVideoUserVoteData = {
    //       user_id: state.userId,
    //       video_id: state.selectedItemId,
    //     };
    //     await sp.web.lists.getByTitle(LIST_NAMES.VideoUserVote_list).items.add(addVideoUserVoteData);
    //  }

      setState((prevState) => ({
        ...prevState,
       // JoyAtWorkVideoVotingListItem: updatedJoyAtWorkVideoVotingListItem,
        isVoting: false,
        selectedItemId: 0,
      }));

      console.log('Item updated successfully in SharePoint.');
    } catch (error) {
      console.error('Error updating item in SharePoint:', error);
    }
  };

  const totalVotes = state.JoyAtWorkVideoVotingListItem.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.vote_count;
  }, 0);

  return (
    <>
      <div key={state.isVoting ? 'thankDiv' : 'no-thankDiv'} className='vcComp'>
        <>
          {
            state.isVoting
              ? state.videoUserVoteListItem.some(x => x.user_id === state.userId) ?
                (<div className="d-flex justify-content-end mt-4">
                  <label className="already-voted">You have already cast your vote in this competition.</label>
                </div>) : (<h1 className='vc-title'>Please select a video and cast your vote</h1>)
              : state.isVotingResult ? <></>
                : (<div className='d-flex justify-content-center align-items-center flex-column'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="158" height="200" viewBox="0 0 158 200" fill="none">
                    {/* SVG content */}
                  </svg>
                  <p>Thank you for voting!</p>
                </div>)
          }
          {/* Add more rendering logic if necessary */}
        </>
      </div>
    </>
  );
};

export default JoyAtWorkVideoVoting;
