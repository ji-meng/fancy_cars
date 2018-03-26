import { fontIcons } from '@thm/fe-common-components/lib/components/Icons/FontIcon/FontIcon.constants'

import { colors } from 'styles'

// ---------- Constants ----------

export const moduleItemTypeMapping = {
    DEMO: 'demo',
    DISCUSSION: 'discussion',
    FOLDER: 'folder',
    PAGE: 'pagesv2',
    SLIDE: 'files',
    QUESTION: 'question',
    UNSUPPORTED: 'unsupported',
}
export const moduleItemTypes = Object.values(moduleItemTypeMapping)

export const packTypeMapping = {
    COURSE_NOTES: 'course_notes',
    MIXED: 'mixed',
    QUESTION_PACK: 'question',
    SLIDES: 'slides',
    TEXTBOOK: 'textbook',
    THIRD_PARTY: 'third_party',
    UNSUPPORTED: 'unsupported',
}
export const packTypes = Object.values(packTypeMapping)

export const questionTypeMapping = {
    MULTIPLE_CHOICE: 'mc',
    NUMERIC_ANSWER: 'na',
    WORD_ANSWER: 'wa',
}
export const questionTypes = Object.values(questionTypeMapping)

// ----------- Helpers -----------

export const getQuestionTypeFromKeyString = keyString => {
    if (keyString.includes('multiplechoicequestion')) {
        return questionTypeMapping.MULTIPLE_CHOICE
    } else if (keyString.includes('numericanswerquestion')) {
        return questionTypeMapping.NUMERIC_ANSWER
    } else if (keyString.includes('wordanswerquestion')) {
        return questionTypeMapping.WORD_ANSWER
    }
    return null
}

export const getModuleItemColor = itemType => {
    switch (itemType) {
        case moduleItemTypeMapping.FOLDER:
            return colors.basic.STEEL_GREY_800
        case moduleItemTypeMapping.PAGE:
            return colors.moduleItems.PAGE
        case moduleItemTypeMapping.SLIDE:
            return colors.moduleItems.SLIDE
        case moduleItemTypeMapping.QUESTION:
        default:
            return colors.moduleItems.QUESTION
    }
}

export const getModuleItemIcon = itemType => {
    switch (itemType) {
        case moduleItemTypeMapping.FOLDER:
            return fontIcons.FOLDER
        case moduleItemTypeMapping.PAGE:
            return fontIcons.MODULETYPE_PAGES
        case moduleItemTypeMapping.SLIDE:
            return fontIcons.MODULETYPE_SLIDE
        case moduleItemTypeMapping.QUESTION:
        default:
            return fontIcons.MODULETYPE_QUESTION
    }
}
