const rooms = [
// Stage 1
[
`                              
                              
                              
        EFG         EFG       
        LMN         LMN       
        STU         STU       
                              
                              
              ABC             
              HIJ             
              OPQ             
               W              
               W              
               W              
               W              
               W              
               W              
               W              
               W              `,
`   I JK                 KI J  
   P QR                 RP Q  
   P QR                 RP Q  
   P QR                 RP Q  
   P QR                 RP Q  
   W XY                 YW X  
   I JK                 KI J  
   P QR      I   J      RP Q  
   P QR      P   Q      RP Q  
   P QR      P   Q      RP Q  
   W XY1    1P   Q1    1YW X  
       1    1P   Q1    1      
       1    1P   Q1    1      
       1   11P   Q11   1      
           11P   Q11          
           11W   X11          
                              
                              
                              `,
`###                         ##
###                         ##
###                         ##
###                         ##
###            !            ##
###          #####          ##
###          #####          ##
###                         ##
###                         ##
###    <====>     <====>    ##
###                         ##
########       +       #######
########   <=======>   #######
########               #######
###########         ##########
###########         ##########
#####   ######%%%######   ####
#####%%%######%%%######%%%####
#####%%%######%%%######%%%####`,
`                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`   |||                   ||   
   |||                   ||   
---)||                   |(---
 {--)|                   |    
 |   |                   |    
 |{--)                   (--} 
 ||                         | 
 ||                         | 
 ||                         | 
 ||                         | 
 ||                         | 
 ||                         | 
 ||                         | 
 ||                         | 
 |(-}                       | 
 (-}| {-}             {-}   (-
   || ~ |             | ~  {--
   || ~ |             | ~  |  
   || ~ |             | ~  |  `,

`| {---)|               |(---} 
| |  {-)               (-}  | 
) |  (}                 {)  | 
--)   |                 |   (-
   {--)                 (--}  
---)                       (--
                              
                              
                              
                              
                              
}                            {
|                            |
|                            |
(-}                        {-)
-}|                        |{-
 ||        {-}   {-}       || 
 |(---}    (}|   |{)   {---)| 
 (---}|     ||   ||    |{---)  `
],
// Stage 2
[
`                              
                              
                              
                              
                              
                              
              EFG             
              LMN             
              STU             
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`   I J  I J         I J  I J  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   P Q  P Q         P Q  P Q  
   W X  P Q         P Q  W X  
        P Q         P Q       
        P Q   I J   P Q       
        W X   P Q   W X       
              P Q             
              W X             
                              
                              
                              
                              `,
`#                            #
#                            #
#                            #
#                            #
#                            #
#                            #
#                            #
#                            #
#              !             #
#             ###            #
#  ###        ###        ### #
#  ###                   ### #
#  ###                   ### #
#  ###  ###         ###  ### #
#  ###  ###    +    ###  ### #
#  ###  ###  #####  ###  ### #
#  ###  ###  #####  ###  ### #
#%%###%%###%%#####%%###%%###%#
#%%###%%###%%#####%%###%%###%#`,
`                              
                              
                              
                              
                              
                              
                              
                              
                              
  ~                         ~ 
  ~                         ~ 
 ~~                         ~ 
 ~~                         ~ 
 ~~                         ~ 
 ~~                         ~ 
 ~~                         ~ 
 ~~                         ~ 
 ~~                         ~ 
 ~~                         ~ `,
`-----}                  {-----
     |                  |     
   {-)                  (-}   
   |                      |   
   (}                    {)   
----)                    (----
                              
                              
--}                         {-
                              
-}                            
                              
                              
----}                    {----
    |                    |    
   {)                    (}   
   (-}                  {-)   
     |                  |     
-----)                  (-----`,
` {--}                         
    |                         
  {-)                         
  |                           
 {)                           
 |                            
 |                            
-)                            
                              
                              
                              
                              
  {-}                         
  | (-}                       
  |   (-}                     
--)     |                {-}  
      {-)          {--}  | (} 
      |   {-}      |  (--)  | 
      (---) |      |        | `,
],
// Stage 3
[
`                              
                              
                              
                              
                              
                              
        EFG         EFG       
        LMN         LMN       
        STU         STU       
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`                              
                              
     BCCCCCCD     BCCCD       
                              
  H                        H  
  O                       MO  
  O                      MTO  
  O     L               MT O  
  O     SL Z       ZZ0 MT  O  
  O  M                     V  
  V MT                        
   MT                         
   T       L                  
       L   S         L        
       S Z S  0Z  0 0S        
                              
                              
                              
                              `,
`##                          ##
##                          ##
##                          ##
##  ##########   #######    ##
##                         ###
##                        ####
##             !         #####
##           #####         ###
##          #######        ###
##   ###################   ###
##    ##################   ###
###                        ###
####                       ###
#  ##                      # #
#  ###         +           # #
##############################
#  ###  ###  #####  ###  ### #
#%%###%%###%%#####%%###%%###%#
#%%###%%###%%#####%%###%%###%#`,
`                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
----}                    {----
    |                    |    
   {)  {--}              (}   
   (---)  |   {---}     {-)   
          (---)   (}    |     
                   (--} (-----`,
` {--}                         
    |                         
  {-)                         
  |                           
 {)                           
 |                            
 |                            
-)                            
                              
                              
                              
                              
  {-}                         
  | (-}                       
  |   (-}                     
--)     |                {-}  
      {-)          {--}  | (} 
      |   {-}      |  (--)  | 
      (---) |      |        | `,
],
// Stage 4
[
`                              
                              
                              
                              
              ABC             
              HIJ             
     EFG      OPQ      EFG    
     LMN       W       LMN    
     STU       W       STU    
               W              
               W              
               W              
               W              
               W              
               W              
               W              
               W              
               W              
               W              `,
`         P   Q   P   Q        
         P   Q   P   Q        
         P   Q   P   Q        
         W   X   W   X        
                              
   1    1             1  A 1  
   1    1             1 AA 1  
   1    1             1    1  
   1    1I   J   I   J1    1  
   1 A A1P   Q   P   Q1A  A1  
   1    1P   Q   P   Q1    1  
   1    1P   Q   P   Q1    1  
   1 AA 1P   Q   P   Q1  A 1  
   1    1P   Q   P   Q1    1  
   1    1P   Q   P   Q1 A  1  
   1A  A1P   Q   P   Q1 AA 1  
   1    1     1 1     1    1  
   1    1     1 1     1    1  
                              `,
`###                         ##
###                         ##
###                         ##
###        !                ##
###<====>#####   #####<====>##
###      #####   #####      ##
###      #####   #####      ##
###<====>#####   #####<====>##
###                         ##
###                         ##
###<====>#####   #####<====>##
###      #####   #####      ##
###      #####   #####      ##
###<====>             <====>##
                              
               +              
###<====>#####<=>#####<====>##
###%%%%%%#####%%%#####%%%%%%##
###%%%%%%#####%%%#####%%%%%%##`,
`                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`  ||                       || 
  ||                       || 
--)|                       || 
---)                       |(-
                           (--
                              
                              
                              
                              
                              
                              
                              
                              
---}                       {--
   ~                       ~  
   ~                       ~  
   ~                       ~{}
   ~{--}{-}                ~||
   ~|  || |                ~||`,
` {--}                         
    |                         
  {-)                         
  |                           
 {)                         {-
 |                          | 
 |                          | 
{)                          | 
|                           | 
(}                          | 
 |                          (}
 |                           |
 |                          {)
-)                          (-
                              
                         {-}  
   {--}                  | (} 
   |  (-}             {--)  | 
---)    |             |     | `,
],
// Stage 5
[
`                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`                              
                              
                              
            BCCCCD            
                              
            H    H            
     BCCCD  O    O  BCCCD     
            V    V            
                              
           MT    UN           
          MT      UN          
         MT        UN         
     MT  T          U         
    MT                        
   MT       MT  UN            
  MT       MT    UN           
 MT       MT      UN          
         MT        UN         
        MT          UN        `,
`#                            #
#                            #
#                            #
#             !              #
#           ######           #
#                            #
#                            #
     #####          #####     
            ######            
     @                  @   ^ 
###                        ###
##    ^               ^^    ##
##   ####            ####   ##
##           ####           ##
##                        ^ ##
####          +           ####
####        ######        ####
######%%##%%######%%##%%######
######%%##%%######%%##%%######`,
`                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              `,
`    ||                  ||    
    ||                  ||    
----)|                  |(----
     |                  |     
     |                  |     
  {--)                  (--}  
  |                        |  
  |                        |  
  |                        |  
  |                        |  
  |                        |  
  |                        |  
  |                        |  
  |                        |  
  |                        |  
--)     {-}        {-}     (--
---}    | ~ {----} ~ |    {---
   |    | ~ |    | ~ |    |   
   |    | ~{)    (}~ |    |   `,
`| {---)|              |(---} |
| |  {-)              (-}  | |
) |  (}                {)  | (
--)   |                |   (--
   {--)                (--}   
---)                      (---
                              
                              
                              
                              
                              
}                            {
|                            |
|                            |
(-}                        {-)
-}|                        |{-
 ||        {-}  {-}        || 
 |(---}    (}|  |{)    {---)| 
 (---}|     ||  ||     |{---)  `
]
];