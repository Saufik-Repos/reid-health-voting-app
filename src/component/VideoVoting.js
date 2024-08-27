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
    <div  key={this.state.isVoting ? 'thankDiv' : 'no-thankDiv'} className='vcComp'>
      <>
        {
          this.state.isVoting
            ? this.state.videoUserVoteListItem.some(x=>x.user_id === this.state.userId)?
            (<div className="d-flex justify-content-end mt-4">
             <label className="already-voted">You have already cast your vote in this competition.</label>
           </div>) : (<h1 className='vc-title'>Please select a video and cast your vote</h1>)
            : this.state.isVotingResult ? <></>
            : (<div className='d-flex justify-content-center align-items-center flex-column'>
              <svg xmlns="http://www.w3.org/2000/svg" width="158" height="200" viewBox="0 0 158 200" fill="none">
                <circle opacity="0.05" cx="78.6927" cy="122.693" r="76.6927" fill="#2AA2DB" />
                <path d="M106.996 67.0186C107.71 67.6032 97.1216 81.8516 83.3496 98.8285L74.9911 108.963L73.8435 110.348L72.6308 109.093C61.8038 97.984 54.5064 89.7554 55.0261 89.2357C55.5458 88.716 63.7959 96.0567 74.8828 106.819L72.5442 107.057L80.7295 96.8146C94.5014 79.7295 106.26 66.4339 106.996 67.0186Z" fill="#32A4DD" />
                <path d="M80.513 148.42C79.6058 148.476 78.8664 148.989 78.3014 149.965C77.7326 150.946 77.4261 152.31 77.3923 154.052C77.3595 155.799 77.6083 157.117 78.1404 158.005C78.6726 158.892 79.3928 159.281 80.3028 159.183C81.2052 159.083 81.9292 158.541 82.4672 157.561C83.0061 156.582 83.2914 155.247 83.3232 153.549C83.357 151.856 83.1208 150.569 82.6175 149.679C82.1143 148.785 81.4125 148.364 80.513 148.42Z" fill="#32A4DD" />
                <path d="M91.35 133.222C91.7896 130.546 92.1772 125.679 90.7986 119.637L90.6366 118.928L58.06 119.511L58.3145 120.583C59.5543 125.814 59.322 130.491 58.9469 133.374L49.9281 133.606L52.2641 163.782L59.2709 176.772L105.325 168.53L107.772 136.1L91.35 133.222ZM60.3111 121.25L89.1896 120.734C90.5855 127.466 89.5791 133.952 89.1896 135.658L60.3178 136.967C60.7854 134.641 61.6579 127.826 60.3111 121.25ZM69.8486 162.711L67.4557 162.997L63.6091 147.058L66.3953 146.914L68.7842 158.971L71.661 146.643L74.1945 146.513L69.8486 162.711ZM83.8188 159.705C82.9897 160.973 81.8049 161.705 80.2479 161.895C78.6717 162.085 77.4637 161.631 76.6384 160.52C75.5153 159.16 74.9783 157.066 75.0391 154.254C75.0959 151.39 75.7187 149.205 76.8958 147.708C77.7683 146.459 78.9956 145.799 80.566 145.72C82.1162 145.643 83.2751 146.172 84.0531 147.298C85.0904 148.608 85.5782 150.626 85.5281 153.359C85.477 156.042 84.9101 158.154 83.8188 159.705ZM94.4832 147.998L91.5718 148.182L91.3597 160.14L89.2551 160.391L89.4749 148.316L86.4044 148.51L86.4545 145.881L94.5266 145.465L94.4832 147.998ZM102.482 158.811L95.509 159.645L95.751 145.403L102.485 145.056L102.444 147.492L97.627 147.798L97.5798 150.791L102.013 150.446L101.974 152.844L97.5374 153.241L97.4767 156.874L102.52 156.331L102.482 158.811Z" fill="#32A4DD" />
                <path d="M86.8064 124.628C81.5956 124.729 76.3839 124.832 71.1712 124.932C71.1761 125.355 71.1732 125.777 71.1616 126.198C76.3781 126.096 81.5928 125.991 86.8083 125.89C86.8151 125.468 86.8151 125.048 86.8064 124.628Z" fill="#32A4DD" />
                <path d="M66.2189 127.665C66.2509 127.691 66.2881 127.71 66.3279 127.721C66.3677 127.732 66.4093 127.735 66.4502 127.729C66.491 127.723 66.5302 127.708 66.5652 127.687C66.6002 127.665 66.6304 127.636 66.6536 127.602C67.4385 126.451 68.1883 125.277 68.9018 124.081C68.9886 123.937 68.9018 123.765 68.7138 123.7L68.3716 123.582C68.1817 123.516 67.958 123.581 67.8732 123.724C67.3957 124.54 66.8997 125.345 66.3856 126.138C66.2931 126.284 66.0974 126.314 65.9528 126.204C65.5448 125.894 65.1354 125.586 64.7246 125.279C64.6452 125.226 64.5514 125.199 64.456 125.201C64.3606 125.204 64.2683 125.235 64.1914 125.292C64.1008 125.36 64.0131 125.431 63.9234 125.5C63.7788 125.615 63.7759 125.8 63.9196 125.907C64.6976 126.492 65.464 127.077 66.2189 127.665Z" fill="#32A4DD" />
                <path d="M86.3755 132.009L70.6805 132.341C70.6294 132.763 70.5774 133.186 70.5244 133.607L86.226 133.271C86.2762 132.85 86.3273 132.43 86.3755 132.009Z" fill="#32A4DD" />
                <path d="M68.6223 130.947L63.4607 131.055C63.3052 132.442 63.1346 133.827 62.9488 135.21L68.1171 135.095C68.2974 133.714 68.4757 132.33 68.6223 130.947Z" fill="#32A4DD" />
                <path d="M127.376 75.1003C126.314 71.3548 121.452 71.7226 121.452 71.7226L121.574 74.324C124.394 73.8337 126.137 77.1297 126.137 77.1297L127.376 75.1003Z" fill="#32A4DD" />
                <path d="M24.0817 82.9751C23.0329 79.2295 18.1569 79.5837 18.1569 79.5837L18.2931 82.1987C21.1125 81.7084 22.8559 85.0045 22.8559 85.0045L24.0817 82.9751Z" fill="#E0E0E0" />
                <path d="M80.9731 31.1452C86.6254 32.8614 90.1394 26.351 90.1394 26.351L86.7071 24.3896C85.0182 28.3803 79.3795 27.9173 79.3795 27.9173L80.9731 31.1452Z" fill="#E0E0E0" />
                <path d="M49.6323 38.1602C47.0037 38.4462 46.6904 41.7422 46.6904 41.7422L48.4474 41.9465C48.4474 40.0125 50.8581 39.2225 50.8581 39.2225L49.6323 38.1602Z" fill="#32A4DD" />
                <path d="M157.968 62.2992C158.349 59.6842 155.244 58.5537 155.244 58.5537L154.603 60.2017C156.483 60.6784 156.66 63.2118 156.66 63.2118L157.968 62.2992Z" fill="#E0E0E0" />
                <path d="M64.9688 3.74553C65.3501 1.13047 62.2447 0 62.2447 0L61.6046 1.66166C63.4842 2.13836 63.6612 4.65808 63.6612 4.65808L64.9688 3.74553Z" fill="#32A4DD" />
                <path d="M0.028066 45.9258C-0.435018 50.0119 4.98578 51.0198 4.98578 51.0198L5.96643 48.2958C2.71123 47.9961 2.24813 44.2097 2.24813 44.2097L0.028066 45.9258Z" fill="#32A4DD" />
                <path d="M120.92 31.0715C123.562 31.2213 124.407 28.0206 124.407 28.0206L122.704 27.5303C122.391 29.4371 119.885 29.8321 119.885 29.8321L120.92 31.0715Z" fill="#32A4DD" />
                <path d="M135.345 41.8307C134.637 42.0293 133.898 42.0985 133.166 42.035C132.433 42.1 131.694 42.0308 130.986 41.8307C132.425 41.5402 133.907 41.5402 135.345 41.8307Z" fill="#E0E0E0" />
                <path d="M137.659 35.9053C137.932 37.3636 137.932 38.8598 137.659 40.3182C137.368 38.8616 137.368 37.3619 137.659 35.9053Z" fill="#E0E0E0" />
                <path d="M140.111 41.6821C140.819 41.4835 141.557 41.4143 142.29 41.4778C143.023 41.4127 143.762 41.482 144.469 41.6821C143.031 41.9726 141.549 41.9726 140.111 41.6821Z" fill="#E0E0E0" />
                <path d="M137.81 47.6197C137.519 46.1585 137.519 44.6543 137.81 43.1931C138.082 44.6561 138.082 46.1567 137.81 47.6197Z" fill="#E0E0E0" />
                <path d="M141.323 45.1383C141.241 45.2064 140.819 44.8523 140.383 44.3484C139.948 43.8444 139.689 43.3541 139.77 43.286C139.852 43.2179 140.288 43.5584 140.71 44.076C141.133 44.5935 141.419 44.9885 141.323 45.1383Z" fill="#E0E0E0" />
                <path d="M141.119 38.3311C141.201 38.4264 140.915 38.8486 140.465 39.2981C140.016 39.7476 139.594 40.0472 139.512 39.9655C139.43 39.8837 139.716 39.4479 140.166 38.9984C140.615 38.549 141.037 38.3311 141.119 38.3311Z" fill="#E0E0E0" />
                <path d="M136.134 40.0557C136.052 40.151 135.644 39.9331 135.222 39.5789C134.799 39.2248 134.527 38.8707 134.595 38.789C134.663 38.7073 135.072 38.9115 135.494 39.2521C135.916 39.5926 136.202 39.9739 136.134 40.0557Z" fill="#E0E0E0" />
                <path d="M135.93 43.0254C136.026 43.0935 135.767 43.5157 135.358 43.9652C134.95 44.4147 134.555 44.7007 134.473 44.619C134.391 44.5372 134.637 44.115 135.045 43.6792C135.454 43.2433 135.849 42.9437 135.93 43.0254Z" fill="#E0E0E0" />
                <path d="M16.6862 29.6735C15.2479 29.9641 13.766 29.9641 12.3277 29.6735C13.0359 29.4749 13.7742 29.4057 14.5069 29.4692C15.2397 29.4042 15.9782 29.4734 16.6862 29.6735Z" fill="#32A4DD" />
                <path d="M19.0004 23.7556C19.291 25.2168 19.291 26.721 19.0004 28.1822C18.7097 26.721 18.7097 25.2168 19.0004 23.7556Z" fill="#32A4DD" />
                <path d="M21.4664 29.5402C22.9047 29.2496 24.3865 29.2496 25.8248 29.5402C24.3865 29.8308 22.9047 29.8308 21.4664 29.5402Z" fill="#32A4DD" />
                <path d="M19.1515 35.4664C18.8609 34.0098 18.8609 32.5101 19.1515 31.0535C19.4422 32.5101 19.4422 34.0098 19.1515 35.4664Z" fill="#32A4DD" />
                <path d="M22.6777 32.8786C22.5824 32.9603 22.1601 32.6062 21.7379 32.0887C21.3157 31.5711 21.0297 31.108 21.125 31.0263C21.2204 30.9446 21.629 31.3123 22.0648 31.8163C22.5006 32.3202 22.7594 32.8786 22.6777 32.8786Z" fill="#32A4DD" />
                <path d="M22.4745 26.2092C22.5562 26.2909 22.2565 26.7268 21.8207 27.1762C21.3849 27.6257 20.949 27.9117 20.8673 27.83C20.7856 27.7483 21.0716 27.3261 21.5211 26.8766C21.9705 26.4271 22.3927 26.073 22.4745 26.2092Z" fill="#32A4DD" />
                <path d="M17.4758 27.9206C17.4077 28.0024 16.9991 27.7981 16.5769 27.4439C16.1546 27.0898 15.8686 26.7357 15.9503 26.6403C16.032 26.545 16.427 26.7629 16.8493 27.1171C17.2715 27.4712 17.5575 27.8253 17.4758 27.9206Z" fill="#32A4DD" />
                <path d="M17.2853 30.8755C17.367 30.9573 17.1082 31.3795 16.7132 31.829C16.3182 32.2784 15.9096 32.5645 15.8143 32.4827C15.7189 32.401 15.9913 31.9788 16.3863 31.5429C16.7813 31.1071 17.1899 30.7938 17.2853 30.8755Z" fill="#32A4DD" />
              </svg>
              <h5 className='success-submit'>Your vote has been successfully submitted</h5>
              <h5 className='thank-you-title'>thank you</h5>
            </div>)
        }
      </>
      <div className="d-flex flex-column gap-4">
        {this.state.JoyAtWorkVideoVotingListItem.map((item) => {
          return <Greeting JoyAtWorkVideoVotingItem={item} selectedItemId={this.state.selectedItemId} totalVotes={totalVotes} isVote={this.state.isVoting} isThank={!this.state.isVoting} handleSelectedItem={this.handleSelectedItem} submitHandling={this.submitHandling}/>
        })
        }
      </div>

    </div>
    {this.state.isVoting
        ? (<div className="d-flex justify-content-end mt-4">
          <button disabled={this.state.selectedItemId <= 0} className='btn btn-primary' onClick={this.submitHandling}>Submit vote</button>
        </div>)
        : ("")
    }

  </>
  );
};

export default JoyAtWorkVideoVoting;
