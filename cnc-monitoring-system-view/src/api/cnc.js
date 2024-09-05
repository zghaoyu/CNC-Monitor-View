import requests from "./request";

async function getCncList() {

    // let res = await 

    return requests.get("/cncs")
}


async function getCncHistoryList() {

    // let res = await 

    return requests.get("/cncs/history")
}

async function getCncProcessDetail() {
    return requests.get("/cncs/process/detail")
}

async function getProduceSchedule() {
    return requests.get("/cncs/Schedule")
}

export { getCncList, getCncHistoryList,getCncProcessDetail}