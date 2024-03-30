const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getAnnonce() {
    return await prisma.annonce.findMany({})
}

async function addAnnonce(title, description, files, authorId) {
    return await prisma.annonce.create(
        {
            data: {
                title,
                description,
                files,
                authorId
            }
        }
    )
}

async function updateAnnonce(id, title, description, files) {
    return await prisma.annonce.update(
        {
            where: {
                id
            },
            data: {
                title, description, files
            }
        }
    )
}

async function deleteAnnonce(id) {
    return await prisma.annonce.delete(
        {
            where: {
                id
            }
        }
    )
}

async function addTutorial(title, topic,image, description) {
    return await prisma.tutorial.create(
        {
            data: {
                title,
                topic,
                description,
                image
            }
        }
    )
}

async function updateTutorial(id, title, topic, description,image) {
    return await prisma.tutorial.update(
        {
            where: {
                id
            },
            data: {
                title, topic, description,image
            }
        }
    )
}

async function deleteTutorial(id) {
    await prisma.tutorial.delete(
        {
            where: {
                id
            }
        }
    )

    await prisma.tutorialElement.deleteMany(
        {
            where: {
                tutorialId : id
            }
        }
    )

    return {
        "process" : "done"
    }
}

async function getTutorials(topic) {
    const { title, description, topicc } = await prisma.tutorial.findMany({ where: { topic } })
    return {
        title,
        description,
        "topic": topicc
    }
}

async function getTutorial(id) {
    return await prisma.tutorialElement.findMany({
        tutorialId: id
    })
}

async function addTutorialElement(tutorialId, title, description, files,) {
    return await prisma.tutorialElement.create({
        data: {
            tutorialId, title, description, files
        }
    })
}


async function updateTutorialElement(id, title, description, files) {
    return await prisma.tutorialElement.update(
        {
            where: {
                id
            },
            data: {
                title, description, files
            }
        }
    )
}

async function deleteTutorialElement(id) {
    return await prisma.tutorialElement.delete(
        {
            where: {
                id
            }
        }
    )
}



module.exports = { getAnnonce, addAnnonce, updateAnnonce, deleteAnnonce, addTutorial, updateTutorial, deleteTutorial, getTutorials, getTutorial, addTutorialElement, updateTutorialElement, deleteTutorialElement }