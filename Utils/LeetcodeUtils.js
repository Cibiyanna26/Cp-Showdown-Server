

const apiUrl = 'https://leetcode.com/graphql';

const getProfileData = async(username) => {
    const query = {
        query: `
            query userPublicProfile($username: String!) {
              matchedUser(username: $username) {
                username
                profile {
                  ranking
                  userAvatar
                  skillTags
                }
              }
            }`,
        variables: { username }
    };
    try{
        const response = await fetch(`${apiUrl}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(query)
            }
        );
        const data = await response.json();
        if(data.errors!=null) {
            return {
                status: 404,
                message: data.errors[0].message
            }
        }
        else {
            return {
                status : 200,
                message: "Profile fetched sucessfully",
                data : data.data.matchedUser
            }
        }
    }catch(error){
        return {
            status : 500,
            message: "Internal Server Error",
            error : error
        }
    }
}

const getProblemSolved = async(username) => {
    const query = {
        query:`
            query userProblemsSolved($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                problemsSolvedBeatsStats {
                difficulty
                percentage
                }
                submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
                }
            }
            }
        `,
        variables: { username }
    };
    try{
        const response = await fetch(apiUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: "Data fetched sucessfully",
            data : data.data
        }
    }
    catch(error){
        return {
            status : 500,
            message: "Internal server error"
        }
    }
}

const getContestStats = async(username) => {
    const query = {
        query : `
            query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                topPercentage
            }
            }
        `,
        variables : { username }
    };
    try{
        const response = await fetch(apiUrl, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: 'Data fetched sucessfully',
            data :  data.data.userContestRanking
        }
    }catch(error){
        return {
            status : 500,
            message: 'Internal server Error'
        }
    }
}

const getLangStats = async(username) => {
    const query = {
        query: `
            query languageStats($username: String!) {
                matchedUser(username: $username) {
                    languageProblemCount {
                    languageName
                    problemsSolved
                    }
                }
            }
        `,
        variables : {username}
    };
    try{
        const response = await fetch(apiUrl, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: 'Data fetched sucessfully',
            data : data.data.matchedUser
        }
    }catch(error){
        return {
            status : 500,
            message: 'Internal server error'
        }
    }
}

const getSkillStats = async(username) => {
    const query = {
        query : `
        query skillStats($username: String!) {
            matchedUser(username: $username) {
                tagProblemCounts {
                advanced {
                    tagName
                    tagSlug
                    problemsSolved
                }
                intermediate {
                    tagName
                    tagSlug
                    problemsSolved
                }
                fundamental {
                    tagName
                    tagSlug
                    problemsSolved
                }
                }
            }
            }
        `,
        variables : { username }
    };
    try{
        const response = await fetch(apiUrl,{
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: 'Data fetched sucessfully',
            data : data.data.matchedUser
        }
    }catch(error){
        return {
            status : 500,
            message: 'Internal server error'
        }
    }
}

const calclulateLeetcodeScore = async(username) => {
    const profile = await getProfileData(username)
    if(profile.status != 200) return profile;

    const probSolved = await getProblemSolved(username);
    // problem solved calculation
    const solvedCount = probSolved.data.matchedUser.submitStatsGlobal.acSubmissionNum
    let easyProbSolved = solvedCount[1].count;
    let medProbSolved = solvedCount[2].count;
    let hardProbSolved = solvedCount[3].count;
    console.log(easyProbSolved,medProbSolved,hardProbSolved)
    easyProbSolved = easyProbSolved/probSolved.data.allQuestionsCount[1].count
    medProbSolved = medProbSolved/probSolved.data.allQuestionsCount[2].count
    hardProbSolved = hardProbSolved/probSolved.data.allQuestionsCount[3].count
    let totScore = easyProbSolved*100 + medProbSolved*150 + hardProbSolved*200
    // console.log(totScore)

    // acceptance calculation
    const acceptance = probSolved.data.matchedUser.problemsSolvedBeatsStats
    // console.log(acceptance)
    totScore = totScore + (acceptance[0].percentage + acceptance[1].percentage*1.5 + acceptance[2].percentage*2)
    console.log(totScore)

    // contest calculations
    const contestStats = await getContestStats(username)
    totScore = totScore + (contestStats.data.rating/3000)*200
    console.log(totScore)


}

calclulateLeetcodeScore('arulcibi007')

/*
(async()=>{
    const values = await getSkillStats('DharunAP');
    console.log(values.data)
})();
*/

/*
(async () => {
    let values = await getLangStats('DharunAP');
    console.log(values.data)
})();
*/

/*
(async () => {
    let values = await getProblemSolved('DharunAP');
    console.log(values)
})();
*/

/*
(async () => {
    let values = await getProfileData('DharunAP');
    console.log(values);
    // {
    //     status: 200,
    //     message: 'Profile fetched sucessfully',
    //     data: {
    //       username: 'DharunAP',
    //       profile: {
    //         ranking: 86718,
    //         userAvatar: 'https://assets.leetcode.com/users/DharunAP/avatar_1732074291.png',
    //         realName: 'Dharun A P',
    //         skillTags: [Array]
    //       }
    //     }
    //   }
})();
*/


    // // Skill calculations
    // const skills = await getSkillStats(username)
    // let fundamental = 0, intermediate = 0, advanced = 0
    // skills.data.tagProblemCounts.fundamental.forEach(element => {
    //     fundamental += element.problemsSolved
    // })
    // console.log(fundamental)
    // skills.data.tagProblemCounts.intermediate.forEach(element => {
    //     intermediate += element.problemsSolved
    // })
    // console.log(intermediate)
    // skills.data.tagProblemCounts.advanced.forEach(element => {
    //     advanced += element.problemsSolved
    // })
    // console.log(advanced)
    // // totScore = totScore + (fundamental + intermediate*1.25 + advanced*1.5)