import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://pb.luna-gouraud.fr:443');

export default pb;

export async function getProjets() {
    try {
        return await pb.collection("Projets").getFullList({
            sort: "-created",
        });
    } catch (error) {
        console.error(
            "Une erreur est survenue en lisant la liste des projets",
            error,
        );
        return [];
    }
}

export async function getProjet(id) {
    try {
        return await pb.collection("Projets").getOne(id);
    } catch (error) {
        console.error("Une erreur est survenue en lisant le projet", error);
        return null;
    }
}

export function getImageUrl(record, recordImage, thumb = "480x0") {
    const firstImage = Array.isArray(recordImage)
        ? recordImage[0]
        : recordImage;

    return firstImage
        ? pb.files.getURL(record, firstImage, { thumb })
        : "";
}

export async function addProjet(projet) {
    try {
        await pb.collection("Projets").create(projet);
        return {
            success: true,
            message: "Projet ajouté avec succès",
        };
    } catch (error) {
        console.error("Une erreur est survenue en ajoutant le projet", error);
        return {
            success: false,
            message: "Une erreur est survenue en ajoutant le projet",
        };
    }
}

export async function getCompetencesLogiciels() {
    try {
        return await pb
            .collection("Competences_logiciel")
            .getFullList({
                sort: "Nom",
            });
    } catch (error) {
        console.error(
            "Une erreur est survenue en lisant les compétences logiciel",
            error,
        );
        return [];
    }
}

export async function getCompetenceLogiciel(id) {
    try {
        return await pb.collection("Competences_logiciel").getOne(id);
    } catch (error) {
        console.error(
            "Une erreur est survenue en lisant la compétence logiciel",
            error,
        );
        return null;
    }
}

export async function getCompetencesTechniques() {
    try {
        return await pb
            .collection("Competences_techniques")
            .getFullList({
                sort: "Nom",
            });
    } catch (error) {
        console.error(
            "Une erreur est survenue en lisant les compétences techniques",
            error,
        );
        return [];
    }
}

export async function getCompetenceTechnique(id) {
    try {
        return await pb.collection("Competences_techniques").getOne(id);
    } catch (error) {
        console.error(
            "Une erreur est survenue en lisant la compétence technique",
            error,
        );
        return null;
    }
}

