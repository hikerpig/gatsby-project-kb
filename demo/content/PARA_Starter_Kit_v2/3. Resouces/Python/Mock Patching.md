## Highlights: 
`Mock.patch `  will intercept import statements identified by a string, and return a Mock instance you can preconfigure using the techniques we discussed above.

we need to supply  `Mock.patch ` with a string representing our specific import. We do not want to supply simply  `os.getcwd `  since that would patch it for all modules, instead we want to supply the module under test’s import of os , i.e. work.os . When the module is imported patch will work its magic and return a Mock instead.
