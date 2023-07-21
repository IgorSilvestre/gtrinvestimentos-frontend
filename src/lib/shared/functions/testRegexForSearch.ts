import { regexForSearch } from './regexForSearch'

export function testRegexForSearch (regexWord: string, wordToMatch: string): boolean {
    return regexForSearch(regexWord).test(wordToMatch)
} 
