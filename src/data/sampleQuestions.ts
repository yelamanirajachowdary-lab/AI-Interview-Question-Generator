import { Question } from '../types/interview';

export const SAMPLE_QUESTIONS: Question[] = [
  // ==========================================
  // JAVA QUESTIONS (14 Questions)
  // ==========================================
  // Java - Easy
  {
    id: 'java-e-1',
    subject: 'Java',
    difficulty: 'Easy',
    topic: 'Core Fundamentals',
    question: 'What is the difference between JDK, JRE, and JVM in Java?',
    answer: 'JVM (Java Virtual Machine) is the abstract execution engine that runs Java bytecode. JRE (Java Runtime Environment) contains the JVM plus core runtime libraries needed to execute programs. JDK (Java Development Kit) is the complete software package for developers, containing the JRE plus development tools like the compiler (javac), debugger, and archiver (jar).',
    keyPoints: [
      'JVM executes bytecode (.class files) and provides platform independence.',
      'JRE = JVM + Class Libraries (to run Java apps).',
      'JDK = JRE + Development Tools (javac, jdb, jar to create apps).'
    ],
    codeSnippet: '// Compilation and Execution flow:\n// Source (.java) ---> [javac compiler] ---> Bytecode (.class) ---> [JVM execution]',
    interviewTips: 'Start from inside out: JVM is the core engine, JRE wraps it with libraries, JDK wraps JRE with build tools.'
  },
  {
    id: 'java-e-2',
    subject: 'Java',
    difficulty: 'Easy',
    topic: 'OOP Concepts',
    question: 'What are the four pillars of Object-Oriented Programming (OOP) in Java?',
    answer: 'The four fundamental pillars of OOP are Encapsulation (bundling data and methods into a single unit and restricting direct access via access modifiers), Inheritance (a mechanism where a new class inherits properties and behaviors from an existing class), Polymorphism (the ability of an entity to take multiple forms through overloading and overriding), and Abstraction (hiding implementation details and showing only essential features to the user).',
    keyPoints: [
      'Encapsulation: Data hiding using private fields with public getters/setters.',
      'Inheritance: Code reusability via "extends" keyword.',
      'Polymorphism: Compile-time (Method Overloading) and Runtime (Method Overriding).',
      'Abstraction: Abstract classes and Interfaces define "what" without specifying "how".'
    ],
    interviewTips: 'Give real-world analogies (e.g., Car pedals represent abstraction, Bank account balance represents encapsulation).'
  },
  {
    id: 'java-e-3',
    subject: 'Java',
    difficulty: 'Easy',
    topic: 'Strings & Memory',
    question: 'Why are Strings immutable in Java?',
    answer: 'In Java, String objects cannot be modified after creation. If you change a String, a new String object is created. Strings are immutable primarily for: 1) Security (Strings are used for network connections, file paths, and database URLs), 2) String Pool caching (saving heap memory by sharing identical string literals), 3) Thread Safety (immutable objects are inherently thread-safe without synchronization), and 4) HashCode caching (cached upon creation for fast HashMap lookups).',
    keyPoints: [
      'String Pool: Multiple references can point to the same cached literal.',
      'Security: Prevents tampering with critical credentials or system arguments.',
      'Thread Safety: Safe to share across concurrent threads without locks.',
      'Use StringBuilder or StringBuffer when frequent string modifications are required.'
    ],
    codeSnippet: 'String s1 = "Hello";\ns1.concat(" World"); // s1 still refers to "Hello"\nString s2 = s1.concat(" World"); // s2 points to new String "Hello World"',
    interviewTips: 'Mention StringBuilder for single-threaded mutation and StringBuffer for thread-safe mutation.'
  },
  {
    id: 'java-e-4',
    subject: 'Java',
    difficulty: 'Easy',
    topic: 'Collections Framework',
    question: 'What is the difference between an Array and an ArrayList in Java?',
    answer: 'An Array is a fixed-size, homogeneous data structure that can store both primitives and objects. An ArrayList is part of the Java Collections Framework (java.util) that provides a dynamic, resizable array which can only store objects (primitives are wrapped automatically via autoboxing). Arrays have faster performance and smaller memory overhead, while ArrayList provides rich helper methods like add, remove, and contains.',
    keyPoints: [
      'Size: Array size is fixed at declaration; ArrayList grows automatically by 50% when full.',
      'Data Types: Array holds primitives (int, char) and objects; ArrayList only holds objects (Integer, String).',
      'Methods: Array uses length attribute; ArrayList uses size(), add(), remove(), contains().'
    ],
    codeSnippet: 'int[] arr = new int[5]; // Fixed size\nArrayList<Integer> list = new ArrayList<>(); // Dynamic size\nlist.add(10);',
    interviewTips: 'Emphasize that under the hood, ArrayList creates a new larger array (size * 1.5) and copies elements when capacity is exceeded.'
  },

  // Java - Medium
  {
    id: 'java-m-1',
    subject: 'Java',
    difficulty: 'Medium',
    topic: 'OOP & Interfaces',
    question: 'What is the difference between an Abstract Class and an Interface in Java 8+?',
    answer: 'An Abstract Class can have state (instance variables) and constructors, supports single inheritance ("extends"), and can contain both abstract and concrete methods. An Interface cannot have instance state (only public static final constants), supports multiple inheritance ("implements"), and since Java 8 can include default and static methods, and Java 9 private methods. Abstract classes represent "is-a" identity, while interfaces define a "can-do" contract/capability.',
    keyPoints: [
      'Inheritance: A class can extend only one abstract class, but can implement multiple interfaces.',
      'Variables: Abstract classes have instance fields; Interfaces only have public static final constants.',
      'Constructors: Abstract classes have constructors; Interfaces cannot have constructors.',
      'Design Choice: Use abstract class for shared state/code among closely related classes; use interface for peripheral capabilities across unrelated classes.'
    ],
    codeSnippet: 'abstract class Animal {\n    String name;\n    Animal(String name) { this.name = name; }\n    abstract void makeSound();\n}\n\ninterface Flyable {\n    void fly(); // public abstract\n    default void glide() { System.out.println("Gliding..."); }\n}',
    interviewTips: 'Highlight Java 8 default methods and Java 9 private methods to prove modern Java awareness.'
  },
  {
    id: 'java-m-2',
    subject: 'Java',
    difficulty: 'Medium',
    topic: 'Collections & Hashing',
    question: 'How does HashMap work internally in Java?',
    answer: 'HashMap is an array of Node buckets (Node<K, V>). When put(key, value) is called, Java computes hash(key.hashCode()) to determine the bucket index: (n - 1) & hash. If a collision occurs (two keys map to the same bucket), elements are stored in a linked list. In Java 8+, if the number of collisions in a bucket exceeds the TREEIFY_THRESHOLD (8 items) and array capacity is at least 64, the linked list is converted into a balanced Red-Black Tree, reducing lookup time from O(n) to O(log n).',
    keyPoints: [
      'Bucket index calculation: index = hash(key) & (capacity - 1).',
      'Collision resolution: Separate chaining via linked list, upgrading to Red-Black tree when count >= 8.',
      'Load Factor: Default is 0.75; when 75% full, table doubles in capacity (rehash).',
      'Contract: If two objects are equal by equals(), their hashCode() MUST be identical.'
    ],
    codeSnippet: 'static class Node<K,V> implements Map.Entry<K,V> {\n    final int hash;\n    final K key;\n    V value;\n    Node<K,V> next;\n}',
    interviewTips: 'Always mention the equals() and hashCode() contract, plus the Java 8 Red-Black Tree optimization.'
  },
  {
    id: 'java-m-3',
    subject: 'Java',
    difficulty: 'Medium',
    topic: 'Exception Handling',
    question: 'What is the difference between Checked and Unchecked Exceptions in Java?',
    answer: 'Checked exceptions are subclasses of Exception (excluding RuntimeException). They are verified at compile-time, meaning the compiler forces you to handle them using try-catch or declare them with "throws" (e.g., IOException, SQLException). Unchecked exceptions are subclasses of RuntimeException or Error. They occur during runtime, usually represent programming bugs or invalid operations (e.g., NullPointerException, ArrayIndexOutOfBoundsException), and do not require mandatory handling.',
    keyPoints: [
      'Checked: Checked at compile-time; forces defensive recovery code (e.g., FileNotFoundException).',
      'Unchecked: Checked at runtime; subclasses of RuntimeException (e.g., ArithmeticException, NPE).',
      'Error: Fatal system issues outside application control (e.g., OutOfMemoryError, StackOverflowError).'
    ],
    interviewTips: 'Give practical examples of when to use checked (expected recoverable situations like missing network file) vs unchecked (bad logic or invalid API usage).'
  },
  {
    id: 'java-m-4',
    subject: 'Java',
    difficulty: 'Medium',
    topic: 'Multithreading',
    question: 'What is the difference between "extends Thread" and "implements Runnable"?',
    answer: 'Implementing Runnable is the preferred approach because Java only allows single class inheritance; if you extend Thread, your class cannot extend any other class. Implementing Runnable separates the task logic from the execution thread mechanism, promotes loose coupling, and allows the task to be submitted to thread pools via ExecutorService. Extending Thread couples your class directly to the thread lifecycle.',
    keyPoints: [
      'Single Inheritance: Implementing Runnable preserves the ability to extend another base class.',
      'Reusability: A Runnable object can be shared among multiple worker threads.',
      'Thread Pooling: Runnable works seamlessly with modern ExecutorService and ThreadPools.'
    ],
    codeSnippet: '// Preferred modern approach:\nRunnable task = () -> System.out.println("Running in thread: " + Thread.currentThread().getName());\nThread thread = new Thread(task);\nthread.start();',
    interviewTips: 'Mention ExecutorService and Callable<T> as modern alternatives to raw Thread instantiation.'
  },
  {
    id: 'java-m-5',
    subject: 'Java',
    difficulty: 'Medium',
    topic: 'Java 8 Features',
    question: 'What is the difference between map() and flatMap() in the Java Stream API?',
    answer: 'Both are intermediate stream operations. map() performs a one-to-one transformation, taking a Function<T, R> and converting each element into another single element (producing Stream<R>). flatMap() performs a one-to-many transformation, taking a Function<T, Stream<R>> and flattening the resulting streams into a single unified stream (producing Stream<R> instead of Stream<Stream<R>>).',
    keyPoints: [
      'map(): Transforms Stream<T> to Stream<R>. Output size is always equal to input size.',
      'flatMap(): Transforms Stream<List<T>> or Stream<Stream<T>> into flattened Stream<T>.',
      'Use case: flatMap is ideal when dealing with nested collections, Optional unwrapping, or list of lists.'
    ],
    codeSnippet: 'List<List<String>> nested = Arrays.asList(Arrays.asList("a", "b"), Arrays.asList("c", "d"));\nList<String> flat = nested.stream()\n                          .flatMap(Collection::stream)\n                          .collect(Collectors.toList()); // ["a", "b", "c", "d"]',
    interviewTips: 'Summarize with the formula: map is 1-to-1, flatMap is 1-to-stream flattened into a single stream.'
  },

  // Java - Hard
  {
    id: 'java-h-1',
    subject: 'Java',
    difficulty: 'Hard',
    topic: 'JVM & Garbage Collection',
    question: 'How does Garbage Collection work in the JVM, and what are the generations?',
    answer: 'The JVM Heap is divided into generations based on the Weak Generational Hypothesis (most objects die shortly after allocation). The Young Generation contains Eden and two Survivor spaces (S0 and S1). New objects are allocated in Eden. Minor GC cleans Young Gen, moving surviving objects between S0 and S1 and incrementing their age counter. Once an object reaches the age threshold (tenuring threshold), it is promoted to the Old (Tenured) Generation. Major/Full GC cleans the Old Generation. Permanent Gen was replaced by Metaspace (native memory) in Java 8.',
    keyPoints: [
      'Young Gen: Eden + Survivor spaces (S0, S1). Cleaned by fast Minor GC.',
      'Old Gen: Long-lived objects promoted here. Cleaned by Major GC (longer pause times).',
      'Metaspace: Stores class metadata in native OS memory outside JVM heap since Java 8.',
      'Modern GC collectors: G1GC (default since Java 9), ZGC, and Shenandoah (ultra-low latency).'
    ],
    interviewTips: 'Mention Stop-The-World (STW) pauses and highlight G1GC region-based collection.'
  },
  {
    id: 'java-h-2',
    subject: 'Java',
    difficulty: 'Hard',
    topic: 'Concurrency & Memory Model',
    question: 'What does the "volatile" keyword do in Java, and how does it relate to the Java Memory Model (JMM)?',
    answer: 'The "volatile" keyword provides two key guarantees in the Java Memory Model: 1) Visibility: Reads and writes to a volatile variable are performed directly to and from main memory (RAM) rather than CPU thread caches, ensuring all threads immediately observe the latest value. 2) Instruction Reordering Prevention: It establishes a "happens-before" relationship and inserts memory barriers, preventing the compiler and hardware from reordering instructions around the volatile read/write. However, volatile DOES NOT guarantee atomicity (e.g., count++ is not thread-safe).',
    keyPoints: [
      'Visibility guarantee: Flushes write to main memory, invalidates other CPU caches.',
      'No atomicity: Non-atomic composite operations (like read-modify-write count++) still require AtomicInteger or synchronized.',
      'Memory barriers: Prevents compiler instruction reordering (crucial for Double-Checked Locking in Singleton).'
    ],
    codeSnippet: 'private volatile boolean running = true;\n\npublic void stop() { running = false; } // Visible immediately to reader threads',
    interviewTips: 'Emphasize that volatile guarantees visibility and ordering, but NOT atomicity.'
  },
  {
    id: 'java-h-3',
    subject: 'Java',
    difficulty: 'Hard',
    topic: 'Design Patterns & Concurrency',
    question: 'How do you implement a thread-safe Singleton pattern using Double-Checked Locking in Java?',
    answer: 'To implement a thread-safe Singleton with Double-Checked Locking: 1) Make the constructor private, 2) Declare a private static volatile instance variable, 3) In getInstance(), first check if instance is null without locking; if null, synchronize on the class object and check null a second time before creating the object. The volatile keyword is mandatory to prevent CPU instruction reordering where a partially initialized object reference is published to another thread.',
    keyPoints: [
      'First check avoids synchronizing on every single call after initialization.',
      'Second check inside synchronized block ensures only one thread instantiates.',
      'volatile keyword prevents instruction reordering during object memory allocation.'
    ],
    codeSnippet: 'public class Singleton {\n    private static volatile Singleton instance;\n    private Singleton() {}\n\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) {\n                    instance = new Singleton();\n                }\n            }\n        }\n        return instance;\n    }\n}',
    interviewTips: 'Alternatively mention the Bill Pugh Initialization-on-demand holder idiom or Enum singleton as clean alternatives.'
  },
  {
    id: 'java-h-4',
    subject: 'Java',
    difficulty: 'Hard',
    topic: 'Generics & Type Erasure',
    question: 'What is Type Erasure in Java Generics and what are its practical limitations?',
    answer: 'Type Erasure is the compile-time mechanism where the Java compiler translates generic types into raw types or upper bounds and inserts appropriate typecasts. Bytecode contains no type parameter metadata at runtime, maintaining backward compatibility with older Java versions. Practical limitations include: cannot instantiate generic types directly (new T()), cannot create generic arrays (new T[10]), cannot use primitive types as type arguments (no List<int>), and cannot overload methods with the same raw signature.',
    keyPoints: [
      'Compatibility: Designed to ensure code written before Java 5 continues running seamlessly.',
      'Bytecode translation: List<String> and List<Integer> both become raw List at runtime.',
      'Wildcards: Producer Extends, Consumer Super (PECS principle) is used for flexibility.'
    ],
    codeSnippet: '// Compiler replaces List<String> with List\nList<String> list = new ArrayList<>();\nlist.add("hello");\nString s = list.get(0); // Compiler automatically casts (String) list.get(0)',
    interviewTips: 'Mention the PECS guideline (Producer Extends, Consumer Super) when discussing generic wildcards.'
  },
  {
    id: 'java-h-5',
    subject: 'Java',
    difficulty: 'Hard',
    topic: 'Class Loaders & Security',
    question: 'What is the ClassLoader delegation hierarchy in Java and how does it prevent security exploits?',
    answer: 'Java ClassLoaders follow the Parent Delegation Model. When a ClassLoader needs to load a class, it delegates the search to its parent loader before searching its own classpath. The hierarchy consists of: 1) Bootstrap ClassLoader (loads core JDK classes like java.lang.* from rt.jar/modules), 2) Extension/Platform ClassLoader (loads extension libraries), and 3) Application/System ClassLoader (loads application classpath). This prevents malicious code from replacing trusted core classes (like overriding java.lang.String with a hacked version).',
    keyPoints: [
      'Delegation rule: Always ask parent first; only load if parent fails with ClassNotFoundException.',
      'Security: Prevents rogue user code from overriding core Java classes like java.lang.System.',
      'Uniqueness: A class is uniquely identified in JVM by its fully qualified name AND its ClassLoader instance.'
    ],
    interviewTips: 'Explain that custom classloaders are used in frameworks like Tomcat, OSGi, and Spring for hot-reloading and modular isolation.'
  },

  // ==========================================
  // C PROGRAMMING QUESTIONS (13 Questions)
  // ==========================================
  // C - Easy
  {
    id: 'c-e-1',
    subject: 'C',
    difficulty: 'Easy',
    topic: 'Pointers Basics',
    question: 'What is a pointer in C and what are the "&" and "*" operators used for?',
    answer: 'A pointer is a variable that stores the memory address of another variable. The address-of operator (&) returns the memory location where a variable is stored. The dereference or indirection operator (*) is used in two ways: 1) in variable declaration (int *ptr) to designate a pointer type, and 2) in expressions (*ptr) to access or modify the value stored at the memory address pointed to.',
    keyPoints: [
      'Pointer holds an address, not the value directly.',
      '&var = "give me the address of var".',
      '*ptr = "give me the value stored at the address inside ptr".',
      'Pointers allow pass-by-reference simulation in C.'
    ],
    codeSnippet: 'int x = 42;\nint *ptr = &x;     // ptr stores address of x\nprintf("%d", *ptr); // prints 42 (dereferencing)',
    interviewTips: 'Illustrate with a box and arrow: ptr is a box holding an address number pointing to variable x.'
  },
  {
    id: 'c-e-2',
    subject: 'C',
    difficulty: 'Easy',
    topic: 'Memory Allocation',
    question: 'What is the difference between malloc() and calloc() in C?',
    answer: 'Both malloc() and calloc() allocate dynamic memory on the heap defined in <stdlib.h>. malloc(size) allocates a single continuous block of specified bytes and leaves the memory uninitialized (containing garbage values). calloc(num_elements, element_size) allocates memory for an array of elements and automatically initializes all allocated bytes to zero. calloc has slight overhead due to the zero-filling step.',
    keyPoints: [
      'malloc(bytes): Takes 1 argument, allocates uninitialized garbage memory.',
      'calloc(n, size): Takes 2 arguments, allocates memory initialized to zero.',
      'Both return void* (must check for NULL if allocation fails) and must be freed using free().'
    ],
    codeSnippet: 'int *p1 = (int*) malloc(5 * sizeof(int)); // contains garbage values\nint *p2 = (int*) calloc(5, sizeof(int)); // all 5 elements are initialized to 0\nfree(p1); free(p2);',
    interviewTips: 'Always remember to check for NULL return value and call free() to prevent memory leaks.'
  },
  {
    id: 'c-e-3',
    subject: 'C',
    difficulty: 'Easy',
    topic: 'Structures vs Unions',
    question: 'What is the fundamental difference between a struct and a union in C?',
    answer: 'In a struct, each member has its own separate memory location, and the total size of the struct is at least the sum of the sizes of all its members (plus padding for alignment). In a union, all members share the exact same memory location, and the total size is equal to the size of its largest member. As a result, you can use only one member of a union at any given time, whereas struct members can all be used concurrently.',
    keyPoints: [
      'struct: Independent memory for every member; total size >= sum of all member sizes.',
      'union: Shared memory for all members; total size = size of the largest member.',
      'Use union when you need to represent mutually exclusive data fields to conserve memory.'
    ],
    codeSnippet: 'struct DataS { int i; char c; }; // sizeof = 4 + 1 + padding = 8 bytes\nunion DataU  { int i; char c; }; // sizeof = max(4, 1) = 4 bytes',
    interviewTips: 'Mention embedded systems and hardware registers where unions are heavily used to save scarce RAM.'
  },
  {
    id: 'c-e-4',
    subject: 'C',
    difficulty: 'Easy',
    topic: 'Storage Classes',
    question: 'What are the four storage classes in C and what does "static" do?',
    answer: 'The four storage classes in C are: 1) auto (default for local variables, stored on stack), 2) register (hint to store variable in CPU register for fast access), 3) static, and 4) extern (global variable declared in another file). When "static" is applied to a local variable inside a function, it retains its value between function calls throughout program lifetime. When applied to a global variable or function, it limits its scope to the current translation unit (.c file).',
    keyPoints: [
      'static local variable: Stored in data segment, initialized once, persists across calls.',
      'static global/function: Internal linkage, cannot be accessed from other source files via extern.',
      'auto: Default local scope, destroyed when function returns.'
    ],
    codeSnippet: 'void counter() {\n    static int count = 0; // initialized once\n    count++;\n    printf("%d ", count);\n} // Calling counter() 3 times prints: 1 2 3',
    interviewTips: 'Clarify the distinction between static inside a function (persistence) vs static outside a function (internal linkage / file visibility).'
  },

  // C - Medium
  {
    id: 'c-m-1',
    subject: 'C',
    difficulty: 'Medium',
    topic: 'Memory Bugs',
    question: 'What is a Dangling Pointer, a Wild Pointer, and a Memory Leak in C?',
    answer: 'A Dangling Pointer occurs when a pointer still points to a memory location that has already been deallocated (e.g., after free(ptr) or returning address of a local stack variable). A Wild Pointer is an uninitialized pointer that holds a random memory address. A Memory Leak occurs when dynamically allocated heap memory is no longer referenced but has not been released via free(), causing consumed memory to grow until program termination.',
    keyPoints: [
      'Dangling Pointer fix: Set ptr = NULL immediately after free(ptr).',
      'Wild Pointer fix: Always initialize pointers at declaration (int *p = NULL;).',
      'Memory Leak fix: Every malloc/calloc/realloc call must have a matching free() call.',
      'Use tools like Valgrind or AddressSanitizer (ASan) to detect them.'
    ],
    codeSnippet: 'int *p = malloc(sizeof(int));\n*p = 100;\nfree(p);    // p is now a dangling pointer!\np = NULL;   // safe: dereferencing NULL causes immediate visible crash rather than subtle corruption',
    interviewTips: 'Emphasize that setting free-ed pointers to NULL is standard professional C defensive programming.'
  },
  {
    id: 'c-m-2',
    subject: 'C',
    difficulty: 'Medium',
    topic: 'Pointers & Arrays',
    question: 'What is the difference between "char str[] = \"Hello\";" and "char *str = \"Hello\";"?',
    answer: 'In "char str[] = \"Hello\";", an array of 6 characters is allocated on the stack (or data segment if global) and the characters \'H\', \'e\', \'l\', \'l\', \'o\', \'\\0\' are copied into it. The contents of this array CAN be modified (e.g., str[0] = \'M\'). In "char *str = \"Hello\";", str is a pointer stored on the stack pointing to a string literal stored in read-only memory (.rodata). Attempting to modify str[0] invokes Undefined Behavior (typically a Segmentation Fault).',
    keyPoints: [
      'char str[]: Modifiable array on the stack.',
      'char *str: Pointer to read-only string literal in .rodata segment.',
      'Best practice: Declare string literal pointers as "const char *str" to let compiler catch accidental writes.'
    ],
    codeSnippet: 'char arr[] = "Hello";\narr[0] = \'M\'; // OK: "Mello"\n\nconst char *ptr = "Hello";\n// ptr[0] = \'M\'; // Compile error or Runtime SegFault!',
    interviewTips: 'Highlight const correctness: always write const char * when pointing to literals.'
  },
  {
    id: 'c-m-3',
    subject: 'C',
    difficulty: 'Medium',
    topic: 'Preprocessor',
    question: 'What is the difference between a macro (#define) and an inline function in C?',
    answer: '#define macros are preprocessed by simple textual substitution before compilation without type checking, which can cause unexpected side effects (e.g., DOUBLE(x++) evaluating increment twice). Inline functions are handled by the compiler, undergo rigorous type checking, follow standard scoping rules, evaluate arguments exactly once, and suggest to the compiler to embed function code directly to eliminate call overhead.',
    keyPoints: [
      'Macros: Simple text replacement, no type safety, susceptible to operator precedence bugs.',
      'Inline functions: Type-safe, evaluated once, debuggable, scoped.',
      'Macro parenthesis rule: Always parenthesize macro parameters and body: #define SQUARE(x) ((x) * (x)).'
    ],
    codeSnippet: '#define SQUARE(x) (x * x)      // BUG: SQUARE(2 + 3) -> 2 + 3 * 2 + 3 = 11 (expected 25)\nstatic inline int square(int x) { return x * x; } // Correct and type-safe',
    interviewTips: 'Demonstrate the double evaluation trap: SQUARE(i++) expands to ((i++) * (i++)).'
  },
  {
    id: 'c-m-4',
    subject: 'C',
    difficulty: 'Medium',
    topic: 'Bitwise Manipulation',
    question: 'How do you check if a number is a power of 2 using bitwise operators in C?',
    answer: 'A positive number n is a power of 2 if and only if (n > 0) && ((n & (n - 1)) == 0). In binary, a power of 2 has exactly one bit set to 1 (e.g., 8 is 1000). Subtracting 1 flips all bits up to the lowest set bit (8 - 1 = 7, which is 0111). Performing bitwise AND between n and (n - 1) clears the single set bit, resulting in 0.',
    keyPoints: [
      'Powers of 2 in binary: 2 (0010), 4 (0100), 8 (1000), 16 (10000).',
      'n - 1: Inverts all bits after the least significant set bit, including that bit itself.',
      'n & (n - 1) == 0: Eliminates the lowest set bit. If result is 0, exactly one bit was set.',
      'Boundary check: Must verify n > 0 because 0 is not a power of 2.'
    ],
    codeSnippet: 'bool isPowerOfTwo(int n) {\n    return (n > 0) && ((n & (n - 1)) == 0);\n}',
    interviewTips: 'Mention this trick is O(1) time and space complexity, widely used in systems programming and memory allocators.'
  },

  // C - Hard
  {
    id: 'c-h-1',
    subject: 'C',
    difficulty: 'Hard',
    topic: 'Memory Layout & Alignment',
    question: 'What is structure padding and alignment in C, and how can you minimize padding?',
    answer: 'CPUs read memory in word-sized chunks (e.g., 4 or 8 bytes) aligned at addresses divisible by word boundaries. The C compiler inserts unused bytes (padding) between structure members so each data type aligns to an address divisible by its size (e.g., a 4-byte int at an address divisible by 4). To minimize padding, order struct members in descending order of size (largest to smallest) or use compiler pragmas like #pragma pack(1) or __attribute__((packed)).',
    keyPoints: [
      'Natural alignment: Data of size N bytes must reside at memory address divisible by N.',
      'Reordering trick: Place 8-byte types first, followed by 4-byte, 2-byte, then 1-byte.',
      'Packed structs: #pragma pack(1) eliminates padding but can cause performance penalty on unaligned CPU reads.'
    ],
    codeSnippet: '// Bad ordering (sizeof = 12 bytes due to padding):\nstruct Bad { char a; int b; char c; };\n\n// Optimized ordering (sizeof = 8 bytes):\nstruct Good { int b; char a; char c; };',
    interviewTips: 'Calculate the exact offsets: char a (byte 0), 3 padding bytes (1-3), int b (bytes 4-7), char c (byte 8), 3 padding bytes (9-11) for total 12.'
  },
  {
    id: 'c-h-2',
    subject: 'C',
    difficulty: 'Hard',
    topic: 'Function Pointers & Callbacks',
    question: 'What is a function pointer in C and how is it used to implement callbacks and polymorphism?',
    answer: 'A function pointer is a pointer that holds the memory address of the executable code of a function in the text segment. It allows passing functions as arguments to other functions (callbacks) and storing functions in structs to simulate object-oriented tables (vtables / interfaces). Standard library functions like qsort() rely on function pointers to accept custom comparison logic.',
    keyPoints: [
      'Syntax: return_type (*func_ptr_name)(param_types);',
      'Callbacks: Passing a comparison or handler function to a general-purpose algorithm.',
      'OOP in C: Structs containing function pointers mimic classes with methods (like Linux kernel drivers).'
    ],
    codeSnippet: 'int compare(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}\n\nint arr[] = {4, 2, 8, 1};\nqsort(arr, 4, sizeof(int), compare); // compare is passed as function pointer',
    interviewTips: 'Be ready to write the syntax on a whiteboard. Use typedef to simplify messy function pointer signatures.'
  },
  {
    id: 'c-h-3',
    subject: 'C',
    difficulty: 'Hard',
    topic: 'Memory Architecture',
    question: 'What are the main segments of a C program memory layout in RAM?',
    answer: 'A C program in memory is divided into five main segments: 1) Text / Code Segment (read-only executable machine instructions), 2) Initialized Data Segment (.data, contains global and static variables initialized with non-zero values), 3) Uninitialized Data Segment (BSS, contains uninitialized global and static variables, zeroed out by OS before main), 4) Heap (dynamically allocated memory via malloc/calloc, grows upward toward high memory), and 5) Stack (local variables, function call frames, return addresses, grows downward toward low memory).',
    keyPoints: [
      'Stack: LIFO, automatic management, fast allocation, limited size (risk of stack overflow).',
      'Heap: Dynamic manual allocation (malloc/free), larger size, potential fragmentation.',
      'BSS (Block Started by Symbol): Uninitialized globals/statics initialized to zero.',
      'Data Segment: Explicitly initialized globals/statics.'
    ],
    interviewTips: 'Draw the diagram: Text (bottom) -> Data -> BSS -> Heap (grows up) -> ... free space ... -> Stack (grows down from top).'
  },
  {
    id: 'c-h-4',
    subject: 'C',
    difficulty: 'Hard',
    topic: 'Volatile in C Systems',
    question: 'Why is the "volatile" keyword critical in embedded C and device driver programming?',
    answer: 'In C, the "volatile" qualifier informs the compiler that a variable\'s value can change unexpectedly at any time without any code in the current thread modifying it (e.g., by hardware peripherals, memory-mapped I/O registers, or interrupt service routines). It forces the compiler to read the actual value directly from memory every time it is referenced, completely disabling optimizations like caching the value in a CPU register or omitting "redundant" loops.',
    keyPoints: [
      'Prevents compiler from optimizing away reads/writes to memory-mapped hardware registers.',
      'Essential for status flags modified inside Interrupt Service Routines (ISRs).',
      'Crucial for delay loops: without volatile, the compiler optimizes while(!flag) into an infinite loop if flag isn\'t modified in body.'
    ],
    codeSnippet: '// Memory-mapped hardware status register\nvolatile uint32_t *const UART_STATUS = (uint32_t*) 0x40001000;\nwhile (!(*UART_STATUS & READY_BIT)) {\n    // Compiler will reload UART_STATUS from RAM on every iteration\n}',
    interviewTips: 'Emphasize that in C, volatile prevents compiler register caching, but does NOT provide thread synchronization or atomic memory barriers like in Java.'
  },

  // ==========================================
  // PYTHON QUESTIONS (13 Questions)
  // ==========================================
  // Python - Easy
  {
    id: 'py-e-1',
    subject: 'Python',
    difficulty: 'Easy',
    topic: 'Data Types',
    question: 'What is the difference between a List and a Tuple in Python?',
    answer: 'Lists are mutable (elements can be added, removed, or changed in place) and defined using square brackets []. Tuples are immutable (cannot be altered after creation) and defined using parentheses (). Because tuples are immutable, they have smaller memory overhead, faster iteration speed, and can be used as keys in dictionaries (if all elements are hashable), whereas lists cannot be dictionary keys.',
    keyPoints: [
      'Mutability: List is mutable (append, pop, sort); Tuple is immutable.',
      'Syntax: List = [1, 2, 3]; Tuple = (1, 2, 3).',
      'Dictionary keys: Tuples can be dict keys; Lists cannot because they are unhashable.',
      'Performance: Tuples have lower memory allocation and faster access.'
    ],
    codeSnippet: 'my_list = [1, 2, 3]\nmy_list[0] = 99  # OK\n\nmy_tuple = (1, 2, 3)\n# my_tuple[0] = 99  # Raises TypeError: \'tuple\' object does not support item assignment',
    interviewTips: 'Use the analogy: A list is a shopping cart (items change), a tuple is a passport record (fixed identity).'
  },
  {
    id: 'py-e-2',
    subject: 'Python',
    difficulty: 'Easy',
    topic: 'Memory & Mutability',
    question: 'What are mutable vs immutable types in Python?',
    answer: 'Mutable objects can have their internal state modified after creation without changing their memory address (id). Examples include lists, dictionaries, sets, and user-defined classes. Immutable objects cannot be altered once created; any operation that appears to modify them creates a brand new object in memory. Examples include integers, floats, booleans, strings, and tuples.',
    keyPoints: [
      'Mutable: list, dict, set, bytearray.',
      'Immutable: int, float, str, tuple, frozenset, bool.',
      'Function arguments: Passing a mutable object allows in-place modifications inside the function.'
    ],
    codeSnippet: 's = "hello"\ns += " world" # Creates a new string object; \'s\' points to new id\n\nl = [1, 2]\nl.append(3)   # Same list object in-place (id(l) remains identical)',
    interviewTips: 'Mention the classic bug of using mutable default arguments in functions (def add_item(item, list=[]))!'
  },
  {
    id: 'py-e-3',
    subject: 'Python',
    difficulty: 'Easy',
    topic: 'Functions & Arguments',
    question: 'What is the purpose of *args and **kwargs in Python functions?',
    answer: '*args and **kwargs allow a function to accept a dynamic number of positional and keyword arguments. *args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments (key=value pairs) into a dictionary. They provide maximum flexibility when writing decorators, wrapper functions, or subclass constructors.',
    keyPoints: [
      '*args: Unpacks variable positional arguments into a tuple.',
      '**kwargs: Unpacks variable named keyword arguments into a dictionary.',
      'Order: Standard parameters must precede *args, which must precede **kwargs.'
    ],
    codeSnippet: 'def demo(required, *args, **kwargs):\n    print(f"Required: {required}")\n    print(f"Args (tuple): {args}")\n    print(f"Kwargs (dict): {kwargs}")\n\ndemo("first", 1, 2, mode="strict", timeout=30)',
    interviewTips: 'The words "args" and "kwargs" are conventions; what matters syntactically is the single * and double **.'
  },
  {
    id: 'py-e-4',
    subject: 'Python',
    difficulty: 'Easy',
    topic: 'Comprehensions',
    question: 'What is a List Comprehension in Python and why is it preferred over a for-loop?',
    answer: 'A List Comprehension is a concise, readable syntax for creating a new list by applying an expression to each item in an iterable, with optional filtering conditions. It is preferred because it is more Pythonic, easier to read for straightforward transformations, and executes faster than a standard for-loop with append() because it runs at C-speed in the Python bytecode interpreter.',
    keyPoints: [
      'Syntax: [expression for item in iterable if condition]',
      'Speed: Faster than loop append() due to bytecode optimization.',
      'Readable: Expresses mapping and filtering in a single expressive line.'
    ],
    codeSnippet: '# Traditional for-loop:\nsquares = []\nfor x in range(10):\n    if x % 2 == 0:\n        squares.append(x ** 2)\n\n# Equivalent List Comprehension:\nsquares = [x ** 2 for x in range(10) if x % 2 == 0]',
    interviewTips: 'Caution that overly complex nested list comprehensions hurt readability; keep them to 1-2 lines maximum.'
  },

  // Python - Medium
  {
    id: 'py-m-1',
    subject: 'Python',
    difficulty: 'Medium',
    topic: 'Advanced Functions',
    question: 'What is a Decorator in Python and how does it work?',
    answer: 'A Decorator is a higher-order function that takes another function as an argument, extends or alters its behavior without modifying its source code, and returns a new callable wrapper function. It leverages Python\'s first-class functions and closures. The "@decorator_name" syntax is syntactic sugar for "func = decorator_name(func)". Common use cases include logging, authentication, execution timing, and caching.',
    keyPoints: [
      'First-class functions: Functions can be passed as arguments, assigned to variables, and returned.',
      'Closures: The inner wrapper remembers the decorated function reference.',
      'functools.wraps: Always use @functools.wraps(func) on wrapper to preserve original function name and docstring.'
    ],
    codeSnippet: 'import functools\nimport time\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} took {time.time() - start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_task():\n    time.sleep(1)',
    interviewTips: 'Always mention @functools.wraps to prove you know how to preserve metadata (__name__, __doc__).'
  },
  {
    id: 'py-m-2',
    subject: 'Python',
    difficulty: 'Medium',
    topic: 'Memory Efficiency',
    question: 'What is a Generator in Python and how does it differ from a regular function?',
    answer: 'A Generator is a special type of iterator that yields values lazily on demand using the "yield" statement instead of "return". When called, a generator function does not run to completion; it returns a generator object. Each call to next() resumes execution right after the last yield. Generators are memory efficient (O(1) memory) because they do not store the entire sequence in RAM, making them ideal for processing large files or infinite streams.',
    keyPoints: [
      'yield vs return: yield pauses execution and saves state; return terminates function.',
      'Lazy evaluation: Generates items on the fly, consuming minimal RAM.',
      'Generator expressions: (x**2 for x in range(1000000)) instead of memory-heavy list [x**2 ...].'
    ],
    codeSnippet: 'def fibonacci(limit):\n    a, b = 0, 1\n    for _ in range(limit):\n        yield a\n        a, b = b, a + b\n\nfor num in fibonacci(5):\n    print(num) # 0, 1, 1, 2, 3 (values computed one by one)',
    interviewTips: 'Contrast reading a 10GB log file using a generator line-by-line vs loading it all with readlines().'
  },
  {
    id: 'py-m-3',
    subject: 'Python',
    difficulty: 'Medium',
    topic: 'Memory & Copying',
    question: 'What is the difference between Shallow Copy and Deep Copy in Python?',
    answer: 'A Shallow Copy (copy.copy()) constructs a new collection object and populates it with references to the child objects found in the original. If a nested child object is mutable, modifying it in the copy also modifies it in the original. A Deep Copy (copy.deepcopy()) recursively copies the container AND all child objects, creating a completely independent clone where changes to nested objects have zero effect on the original.',
    keyPoints: [
      'Shallow copy: Copies outer container; inner nested objects share identical memory addresses.',
      'Deep copy: Recursively clones all nested objects; zero shared references.',
      'Methods: copy.copy(obj) vs copy.deepcopy(obj).'
    ],
    codeSnippet: 'import copy\norig = [[1, 2], [3, 4]]\nshallow = copy.copy(orig)\ndeep = copy.deepcopy(orig)\n\norig[0][0] = 999\nprint(shallow[0][0]) # 999 (affected!)\nprint(deep[0][0])    # 1 (completely unaffected)',
    interviewTips: 'Use a nested list diagram to clearly explain shared vs duplicate child references.'
  },
  {
    id: 'py-m-4',
    subject: 'Python',
    difficulty: 'Medium',
    topic: 'OOP Internals',
    question: 'What is the difference between "__init__" and "__new__" in Python classes?',
    answer: '__new__ is the actual constructor method that allocates memory and creates a new instance of the class; it is a static method that takes "cls" and must return the newly created instance. __init__ is the initializer method that initializes the attributes of the instance after it has been created; it takes "self" and returns None. __new__ is rarely overridden except when creating Singletons, subclassing immutable types (like int or str), or writing custom metaclasses.',
    keyPoints: [
      '__new__(cls, ...): Allocates and returns the instance object.',
      '__init__(self, ...): Initializes the already-created instance; returns None.',
      'Order: __new__ is called first; if it returns an instance of cls, __init__ is called next.'
    ],
    codeSnippet: 'class Singleton:\n    _instance = None\n    def __new__(cls, *args, **kwargs):\n        if not cls._instance:\n            cls._instance = super().__new__(cls)\n        return cls._instance',
    interviewTips: 'Show the Singleton pattern as the #1 practical use case for overriding __new__.'
  },

  // Python - Hard
  {
    id: 'py-h-1',
    subject: 'Python',
    difficulty: 'Hard',
    topic: 'Concurrency & CPython Internals',
    question: 'What is the Global Interpreter Lock (GIL) in Python and how does it impact multithreading?',
    answer: 'The Global Interpreter Lock (GIL) is a mutex used by CPython (the standard Python implementation) to ensure that only one native OS thread executes Python bytecode at any given moment. It was introduced to simplify CPython\'s memory management (which uses non-thread-safe reference counting). Because of the GIL, Python multithreading does NOT achieve CPU parallelism on multi-core processors for CPU-bound tasks. To utilize multiple CPU cores, developers use the "multiprocessing" module, Celery, or external C-extensions (like NumPy) that release the GIL.',
    keyPoints: [
      'GIL prevents real multi-core parallel execution of pure Python bytecode in multithreading.',
      'I/O-bound tasks (network, disk, web scraping): Multithreading and asyncio still work effectively because threads release the GIL during I/O waits.',
      'CPU-bound tasks (math, image processing, ML): Must use multiprocessing to bypass the GIL by spawning separate OS processes.'
    ],
    interviewTips: 'Clarify that GIL applies to CPython specifically, not PyPy-STM or Jython, and mention Python 3.13 free-threaded (no-GIL) experimental build.'
  },
  {
    id: 'py-h-2',
    subject: 'Python',
    difficulty: 'Hard',
    topic: 'Memory Management',
    question: 'How does Python manage memory and how does it detect and clean cyclic references?',
    answer: 'Python memory management relies on two mechanisms: 1) Reference Counting (primary): Every object tracks how many references point to it. When an object\'s reference count drops to zero, its memory is deallocated immediately. 2) Generational Garbage Collector (cyclic GC): Reference counting fails when objects reference each other cyclically (e.g., A.ref = B, B.ref = A). Python\'s cyclic GC groups objects into 3 generations (0, 1, 2) and runs heuristic graph-traversal algorithms to detect and break isolated unreachable reference cycles.',
    keyPoints: [
      'Reference counting is instantaneous and deterministic for non-cyclic objects.',
      'Cyclic GC: Inspects container objects (lists, dicts, custom instances) that can hold references.',
      'Three generations: Gen 0 (newest, collected frequently), Gen 1, Gen 2 (oldest, collected rarely).'
    ],
    codeSnippet: 'import gc\n# gc.collect() explicitly forces cyclic garbage collection pass',
    interviewTips: 'Explain that simple types like integers and strings cannot cause cycles; cyclic GC only tracks container objects.'
  },
  {
    id: 'py-h-3',
    subject: 'Python',
    difficulty: 'Hard',
    topic: 'Metaprogramming',
    question: 'What is a Metaclass in Python and when would you use one?',
    answer: 'In Python, everything is an object, including classes themselves. A Metaclass is the "class of a class"—it defines how a class is constructed, just as a class defines how an instance is constructed. By default, classes are instances of the built-in metaclass "type". You create a custom metaclass by subclassing "type" and overriding __new__ or __init__. Metaclasses are used in frameworks (like Django ORM or Pydantic) for class validation, automatic attribute registration, and API enforcement at import time.',
    keyPoints: [
      'Relationship: object is instance of Class; Class is instance of Metaclass (default: type).',
      'Execution time: Metaclasses run when the module is imported/class is defined, not when instances are created.',
      'Common quote: "Metaclasses are deeper magic than 99% of users should ever worry about." (Tim Peters).'
    ],
    codeSnippet: 'class Meta(type):\n    def __new__(cls, name, bases, dct):\n        # Enforce all class methods are lowercase\n        for attr, val in dct.items():\n            if callable(val) and not attr.islower():\n                raise TypeError(f"Method {attr} must be lowercase")\n        return super().__new__(cls, name, bases, dct)',
    interviewTips: 'Mention class decorators and __init_subclass__ introduced in Python 3.6 as simpler, modern alternatives to metaclasses for most tasks.'
  },
  {
    id: 'py-h-4',
    subject: 'Python',
    difficulty: 'Hard',
    topic: 'Memory Optimization',
    question: 'What does "__slots__" do in Python classes and what are its trade-offs?',
    answer: 'By default, Python stores an instance\'s attributes in a dynamic dictionary (__dict__), allowing attributes to be added or modified at runtime, but each __dict__ consumes significant memory overhead. Specifying "__slots__ = (\'x\', \'y\')" tells Python to allocate a fixed-size compact array of references instead of a __dict__ for every instance. This drastically reduces memory consumption (often 40-70% savings) and speeds up attribute access, but prevents dynamically adding arbitrary attributes not declared in slots.',
    keyPoints: [
      'Memory savings: Eliminates __dict__ and __weakref__ overhead for millions of small objects.',
      'Faster attribute access: Direct array indexing replaces hash table lookups.',
      'Trade-offs: Cannot add new attributes dynamically; subclasses must also declare __slots__ to maintain benefits.'
    ],
    codeSnippet: 'class Point:\n    __slots__ = (\'x\', \'y\')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(1, 2)\n# p.z = 3  # Raises AttributeError: \'Point\' object has no attribute \'z\'',
    interviewTips: 'Highlight this optimization when processing millions of coordinate points, records, or game entities in RAM.'
  },

  // ==========================================
  // HR & BEHAVIORAL QUESTIONS (13 Questions)
  // ==========================================
  // HR - Easy
  {
    id: 'hr-e-1',
    subject: 'HR',
    difficulty: 'Easy',
    topic: 'Introduction',
    question: 'Tell me about yourself.',
    answer: 'Structure your answer using the "Present - Past - Future" framework in 90 to 120 seconds. 1) Present: Your current role or academic background and key strengths. 2) Past: Relevant projects, achievements, and experiences that built your skills. 3) Future: Why you are excited about this specific role and how you can add immediate value to the team.',
    keyPoints: [
      'Keep it concise: 90-120 seconds, focused on professional story.',
      'Present-Past-Future: Current status -> proud past accomplishments -> why this company/role.',
      'Avoid reciting your entire resume line-by-line; highlight your biggest impact.'
    ],
    interviewTips: 'End with an enthusiastic transition: "I saw this role focuses on X, which matches my passion for Y, and that is why I am thrilled to speak with you today."'
  },
  {
    id: 'hr-e-2',
    subject: 'HR',
    difficulty: 'Easy',
    topic: 'Company Alignment',
    question: 'Why do you want to work for our company?',
    answer: 'Demonstrate that you did thorough research on the company\'s products, mission, engineering culture, and recent news. Connect their specific challenges or goals with your personal skills and career ambitions. Avoid superficial answers like "Because you are a big brand" or "Great salary"; instead, praise specific tech stacks, open-source contributions, or customer-centric products.',
    keyPoints: [
      'Show research: Reference specific products, company values, or recent milestones.',
      'Mutual fit: Connect what they need with what you are skilled at and eager to learn.',
      'Long-term enthusiasm: Express genuine interest in contributing to their roadmap.'
    ],
    interviewTips: 'Visit their engineering blog, latest press releases, or GitHub repos to quote a concrete project that impressed you.'
  },
  {
    id: 'hr-e-3',
    subject: 'HR',
    difficulty: 'Easy',
    topic: 'Self-Awareness',
    question: 'What are your greatest strengths and weaknesses?',
    answer: 'For Strengths: Pick 2-3 genuine professional qualities (e.g., fast learner, analytical problem solver, strong team communicator) backed by concrete examples. For Weaknesses: Pick a real, non-fatal area of improvement (e.g., getting overly detail-focused on perfectionism or hesitation to delegate), and immediately explain the active, proactive steps you are taking to overcome it.',
    keyPoints: [
      'Strengths: Backed by specific achievements, not empty buzzwords.',
      'Weaknesses: Genuine self-awareness + active remediation strategy.',
      'Never say "I have no weaknesses" or fake humble-brags like "I work too hard" without reflection.'
    ],
    interviewTips: 'Formula for weakness: "In the past, I struggled with X. To improve, I started doing Y, and recently that helped me accomplish Z."'
  },
  {
    id: 'hr-e-4',
    subject: 'HR',
    difficulty: 'Easy',
    topic: 'Career Goals',
    question: 'Where do you see yourself in five years?',
    answer: 'Interviewers ask this to test your ambition, commitment, and whether your career aspirations align with the company\'s growth path. State that you aim to become a master in your technical domain, take ownership of larger end-to-end features or system architectures, mentor junior developers, and contribute significantly to high-impact company initiatives.',
    keyPoints: [
      'Realistic progression: Moving from hands-on execution to domain expertise and technical leadership.',
      'Commitment: Show you see a meaningful growth runway inside this company.',
      'Value addition: Focus on the impact and value you will deliver to the team.'
    ],
    interviewTips: 'Balance ambition with humility. Don\'t say "I want your job", but emphasize mastering your craft and expanding team leadership.'
  },

  // HR - Medium
  {
    id: 'hr-m-1',
    subject: 'HR',
    difficulty: 'Medium',
    topic: 'Behavioral & Conflict',
    question: 'Describe a situation where you had a disagreement with a team member or manager. How did you resolve it?',
    answer: 'Use the STAR method (Situation, Task, Action, Result). 1) Situation: Describe the project context and technical disagreement objectively without blaming anyone. 2) Task: Clarify the shared goal (e.g., shipping the feature securely on time). 3) Action: Explain how you listened actively to their perspective, gathered objective data or created a quick proof-of-concept, and discussed pros/cons professionally. 4) Result: The positive outcome achieved, the team consensus reached, and what you learned.',
    keyPoints: [
      'STAR method: Situation -> Task -> Action -> Result.',
      'Focus on ideas, not personalities: Frame the disagreement around code quality, deadlines, or user experience.',
      'Demonstrate mature compromise, active listening, and putting project success first.'
    ],
    interviewTips: 'Show that you can disagree and commit: even if the team went with the other option, you supported it 100%.'
  },
  {
    id: 'hr-m-2',
    subject: 'HR',
    difficulty: 'Medium',
    topic: 'Stress & Deadlines',
    question: 'How do you handle working under tight deadlines or high-pressure situations?',
    answer: 'Explain your systematic framework for managing pressure: 1) Prioritize ruthlessly using frameworks like the Eisenhower Matrix or MoSCoW prioritization to identify must-haves versus nice-to-haves, 2) Break big deliverables into small, manageable milestones, 3) Communicate transparently with stakeholders early if scope adjustments are necessary, and 4) Stay calm and focused by eliminating non-essential distractions.',
    keyPoints: [
      'Prioritization: Focus first on high-impact core requirements.',
      'Early communication: Never hide delays; communicate proactively with options and trade-offs.',
      'Composure: Provide a concrete past example of successfully delivering under tight constraints.'
    ],
    interviewTips: 'Emphasize that good engineers communicate risk early rather than working 24 hours at the last minute and failing silently.'
  },
  {
    id: 'hr-m-3',
    subject: 'HR',
    difficulty: 'Medium',
    topic: 'Failure & Resilience',
    question: 'Tell me about a time you failed or made a major mistake. What did you learn?',
    answer: 'Interviewers look for accountability, humility, and growth mindset. Pick a real mistake (e.g., pushed code with a subtle bug, missed an edge case, or underestimated a timeline). 1) Own the mistake completely without shifting blame, 2) Explain your immediate corrective action to mitigate the damage, 3) Detail the post-mortem process and preventative measures you implemented (e.g., automated tests, checklist, CI/CD checks) so it never happens again.',
    keyPoints: [
      'Take 100% ownership: No defensive excuses or pointing fingers at teammates.',
      'Immediate mitigation: How you fixed the immediate issue.',
      'Long-term prevention: Systems, tests, or processes you created to prevent recurrence.'
    ],
    interviewTips: 'Failure is expected in engineering; what matters is your blameless post-mortem and learning velocity.'
  },
  {
    id: 'hr-m-4',
    subject: 'HR',
    difficulty: 'Medium',
    topic: 'Value Proposition',
    question: 'Why should we hire you over other qualified candidates?',
    answer: 'Synthesize the unique intersection of your 1) Strong technical fundamentals in the required stack, 2) Proven track record of problem-solving and rapid learning, and 3) High ownership and collaborative mindset. Express that you not only write clean, maintainable code but also care deeply about product outcomes, user satisfaction, and lifting up teammates.',
    keyPoints: [
      'Three-pillar pitch: Technical ability + Rapid learning/problem solving + Team collaboration.',
      'High ownership: Treating company challenges as personal responsibilities.',
      'Cultural addition: Bringing positive energy, curiosity, and eagerness to contribute immediately.'
    ],
    interviewTips: 'Avoid sounding arrogant about other applicants; focus purely on the unique value and dedication you bring to this specific team.'
  },
  {
    id: 'hr-m-5',
    subject: 'HR',
    difficulty: 'Medium',
    topic: 'Collaboration',
    question: 'How do you handle receiving critical feedback on your work or code review?',
    answer: 'Emphasize that you treat critical feedback and code reviews as valuable learning opportunities to sharpen your craft, not as personal attacks. Explain that your code is not your identity. When receiving critique: 1) Listen or read with an open mind, 2) Ask clarifying questions to understand the underlying principles (e.g., performance, readability, security), 3) Thank the reviewer for their time, and 4) Implement the suggested improvements promptly.',
    keyPoints: [
      'Detach ego from work: Code quality and team standards come before pride.',
      'Curiosity over defensiveness: Seek to understand the reasoning behind alternative patterns.',
      'Express appreciation: Good code reviews take time and make you a better engineer.'
    ],
    interviewTips: 'Mention that code reviews are two-way conversations; it is healthy to discuss trade-offs respectfully with data.'
  },

  // HR - Hard
  {
    id: 'hr-h-1',
    subject: 'HR',
    difficulty: 'Hard',
    topic: 'Negotiation & Compensation',
    question: 'What are your salary expectations for this position?',
    answer: 'Handle this professionally by pivoting to market benchmarks and role scope. Strategy: "Based on my market research for this role in our location and my level of experience, the industry benchmark is typically between $X and $Y. However, compensation is just one part of the equation—I am equally focused on the growth opportunities, team culture, and total benefits package. I am confident that if we are the right mutual fit, we can agree on a fair and competitive offer."',
    keyPoints: [
      'Do your research: Know industry salary percentiles (Glassdoor, Levels.fyi, LinkedIn) beforehand.',
      'Give a reasonable range rather than a single rigid number.',
      'Emphasize overall package: Culture, learning curve, equity, benefits, and long-term trajectory.'
    ],
    interviewTips: 'Never demand a number blindly; always tie it back to research and willingness to find mutual ground.'
  },
  {
    id: 'hr-h-2',
    subject: 'HR',
    difficulty: 'Hard',
    topic: 'Career Transitions',
    question: 'Why are you looking to leave your current job (or why is there a gap in your resume)?',
    answer: 'Always keep your tone strictly positive and forward-looking. Never speak negatively about past employers, colleagues, or managers. If changing jobs: emphasize seeking new technical challenges, greater ownership, or specific alignment with this company\'s mission. If explaining a gap: explain what you accomplished during the time (e.g., upskilling in modern technologies, certifications, freelancing, family responsibilities) and emphasize that you are energized and 100% ready to excel.',
    keyPoints: [
      'Golden rule: Never badmouth a former employer or team.',
      'Focus on "Pull" factors (excitement about new opportunity) rather than "Push" factors (frustrations).',
      'If explaining a gap: Be honest, show how you stayed productive, and pivot to your current readiness.'
    ],
    interviewTips: 'Turn any transition into a story of intentional personal growth and clarity of purpose.'
  },
  {
    id: 'hr-h-3',
    subject: 'HR',
    difficulty: 'Hard',
    topic: 'Leadership & Ambiguity',
    question: 'Describe a time you had to lead a project or take initiative with little to no guidance or documentation.',
    answer: 'Use STAR: 1) Situation: Inherited an undefined requirement or legacy service with zero documentation and minimal direction. 2) Task: Define requirements, build clarity for the team, and establish a viable delivery path. 3) Action: Researched existing code/logs, interviewed cross-functional stakeholders, drafted a 1-page design proposal (RFC), broke down tasks, and set clear milestones with feedback loops. 4) Result: Successfully delivered the feature, created documentation for future engineers, and reduced onboarding friction.',
    keyPoints: [
      'Proactive initiative: Seeking answers rather than waiting passively for instructions.',
      'Stakeholder alignment: Writing short proposals to align assumptions before coding.',
      'Documentation legacy: Leaving the codebase and docs in a better state than you found it.'
    ],
    interviewTips: 'This question tests autonomy and senior mindset: do you freeze in ambiguity, or do you bring structure to chaos?'
  },
  {
    id: 'hr-h-4',
    subject: 'HR',
    difficulty: 'Hard',
    topic: 'Questions for Interviewer',
    question: 'Do you have any questions for us?',
    answer: 'Always ask thoughtful, high-signal questions! Saying "No, I think you covered everything" signals lack of genuine engagement. Ask 2-3 prepared questions such as: 1) "What does success look like in the first 90 days for someone in this role?", 2) "What is the biggest engineering or product challenge your team is tackling this quarter?", or 3) "How does the team handle technical debt versus shipping new features?"',
    keyPoints: [
      'Never say "No questions": An interview is a two-way evaluation.',
      'Ask about 90-day success metrics, team culture, engineering hurdles, and mentorship.',
      'Avoid asking purely about vacation days or perks in the initial round.'
    ],
    interviewTips: 'Taking notes when they answer shows you are deeply engaged and serious about joining.'
  }
];
