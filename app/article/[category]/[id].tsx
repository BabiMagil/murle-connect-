import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getArticleById } from "@/utils/contentLoader";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();

  const article = getArticleById(String(id));

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>
          Article Not Found
        </Text>

        <Text style={styles.errorText}>
          We could not find this article.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*
   * TEXT BLOCK RENDERER
   */

  function TextBlock({ text }: { text: any }) {
    if (
      text === null ||
      text === undefined ||
      text === ""
    ) {
      return null;
    }

    if (Array.isArray(text)) {
      return (
        <View>
          {text.map((item, index) => (
            <TextBlock
              key={index}
              text={item}
            />
          ))}
        </View>
      );
    }

    if (typeof text === "object") {
      return (
        <View>
          {Object.entries(text).map(
            ([key, value]: any) => (
              <View
                key={key}
                style={styles.section}
              >
                <Text style={styles.sectionHeading}>
                  {formatHeading(key)}
                </Text>

                <TextBlock text={value} />
              </View>
            )
          )}
        </View>
      );
    }

    return (
      <Text style={styles.paragraph}>
        {String(text)}
      </Text>
    );
  }

  /*
   * FORMAT HEADINGS
   */

  function formatHeading(value: string) {
    if (!value) {
      return "";
    }

    return value
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) =>
        letter.toUpperCase()
      );
  }

  /*
   * PROVERB SECTIONS
   *
   * Supports:
   *
   * sections: [
   *   {
   *     heading: "Meaning",
   *     content: [
   *       "Paragraph 1",
   *       "Paragraph 2"
   *     ]
   *   }
   * ]
   */

  function renderSections() {
    if (
      !article.sections ||
      !Array.isArray(article.sections)
    ) {
      return null;
    }

    return (
      <View style={styles.articleContent}>
        {article.sections.map(
          (section: any, index: number) => (
            <View
              key={index}
              style={styles.section}
            >
              {section.heading && (
                <Text
                  style={styles.sectionHeading}
                >
                  {section.heading}
                </Text>
              )}

              {Array.isArray(section.content) ? (
                section.content.map(
                  (
                    paragraph: any,
                    paragraphIndex: number
                  ) => (
                    <Text
                      key={paragraphIndex}
                      style={styles.paragraph}
                    >
                      {String(paragraph)}
                    </Text>
                  )
                )
              ) : (
                <TextBlock
                  text={section.content}
                />
              )}
            </View>
          )
        )}
      </View>
    );
  }

  /*
   * NORMAL ARTICLE BODY
   *
   * Supports:
   *
   * body: [
   *   {
   *     heading: "Introduction",
   *     paragraphs: [...]
   *   }
   * ]
   */

  function renderBody() {
    if (!article.body) {
      return null;
    }

    if (Array.isArray(article.body)) {
      return (
        <View style={styles.articleContent}>
          {article.body.map(
            (section: any, index: number) => (
              <View
                key={index}
                style={styles.section}
              >
                {section.heading && (
                  <Text
                    style={styles.sectionHeading}
                  >
                    {section.heading}
                  </Text>
                )}

                {section.paragraphs &&
                Array.isArray(section.paragraphs) ? (
                  section.paragraphs.map(
                    (
                      paragraph: any,
                      paragraphIndex: number
                    ) => (
                      <Text
                        key={paragraphIndex}
                        style={styles.paragraph}
                      >
                        {String(paragraph)}
                      </Text>
                    )
                  )
                ) : section.content &&
                  Array.isArray(section.content) ? (
                  section.content.map(
                    (
                      paragraph: any,
                      paragraphIndex: number
                    ) => (
                      <Text
                        key={paragraphIndex}
                        style={styles.paragraph}
                      >
                        {String(paragraph)}
                      </Text>
                    )
                  )
                ) : (
                  <TextBlock
                    text={section}
                  />
                )}
              </View>
            )
          )}
        </View>
      );
    }

    return (
      <View style={styles.articleContent}>
        <TextBlock text={article.body} />
      </View>
    );
  }

  /*
   * CONTENT RENDERER
   */

  function renderContent() {
    /*
     * PROVERB SECTIONS
     */

    if (
      article.sections &&
      Array.isArray(article.sections)
    ) {
      return renderSections();
    }

    /*
     * NORMAL ARTICLE BODY
     */

    if (article.body) {
      return renderBody();
    }

    /*
     * OLD CONTENT FORMAT
     */

    if (article.content) {
      return (
        <View style={styles.articleContent}>
          <TextBlock text={article.content} />
        </View>
      );
    }

    /*
     * OLD PROVERB FORMAT
     */

    if (
      article.murle ||
      article.english ||
      article.meaning ||
      article.explanation
    ) {
      return (
        <View style={styles.articleContent}>
          {article.murle && (
            <View style={styles.section}>
              <Text
                style={styles.sectionHeading}
              >
                Murle Proverb
              </Text>

              <Text style={styles.paragraph}>
                {article.murle}
              </Text>
            </View>
          )}

          {article.english && (
            <View style={styles.section}>
              <Text
                style={styles.sectionHeading}
              >
                Translation
              </Text>

              <Text style={styles.paragraph}>
                {article.english}
              </Text>
            </View>
          )}

          {article.meaning && (
            <View style={styles.section}>
              <Text
                style={styles.sectionHeading}
              >
                Meaning
              </Text>

              <Text style={styles.paragraph}>
                {article.meaning}
              </Text>
            </View>
          )}

          {article.explanation && (
            <View style={styles.section}>
              <Text
                style={styles.sectionHeading}
              >
                Explanation
              </Text>

              <Text style={styles.paragraph}>
                {article.explanation}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO IMAGE */}

      {article.image && (
        <Image
          source={{
            uri: article.image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* TITLE */}

      <Text style={styles.title}>
        {article.title}
      </Text>

      {/* SUBTITLE */}

      {article.subtitle && (
        <Text style={styles.subtitle}>
          {article.subtitle}
        </Text>
      )}

      {/* AUTHOR */}

      {article.author && (
        <Text style={styles.author}>
          By {article.author}
        </Text>
      )}

      {/* DATE */}

      {article.publishedAt && (
        <Text style={styles.date}>
          {article.publishedAt}
          {article.readingTime
            ? ` • ${article.readingTime} min read`
            : ""}
        </Text>
      )}

      {/* SUMMARY */}

      {article.summary && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            {article.summary}
          </Text>
        </View>
      )}

      {/* ARTICLE CONTENT */}

      {renderContent()}

      {/* HISTORICAL NOTE */}

      {article.historicalNote && (
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            Historical Note
          </Text>

          <Text style={styles.noteText}>
            {article.historicalNote}
          </Text>
        </View>
      )}

      {/* REFERENCES */}

      {article.references &&
        Array.isArray(article.references) && (
          <View style={styles.referencesBox}>
            <Text
              style={styles.referencesTitle}
            >
              References
            </Text>

            {article.references.map(
              (
                reference: string,
                index: number
              ) => (
                <Text
                  key={index}
                  style={styles.reference}
                >
                  {index + 1}. {reference}
                </Text>
              )
            )}
          </View>
        )}

      {/* TAGS */}

      {article.tags &&
        Array.isArray(article.tags) &&
        article.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsTitle}>
              Tags
            </Text>

            <View style={styles.tags}>
              {article.tags.map(
                (
                  tag: string,
                  index: number
                ) => (
                  <View
                    key={index}
                    style={styles.tag}
                  >
                    <Text
                      style={styles.tagText}
                    >
                      #{tag}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
        )}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1E8",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 18,
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    color: "#1D0202",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: "#5E4A3A",
    marginBottom: 14,
  },

  author: {
    fontSize: 14,
    fontWeight: "600",
    color: "#795548",
    marginBottom: 5,
  },

  date: {
    fontSize: 13,
    color: "#8A8178",
    marginBottom: 24,
  },

  summaryBox: {
    backgroundColor: "#EFE4CF",
    borderLeftWidth: 5,
    borderLeftColor: "#9A6A2F",
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
  },

  summaryText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#3F3025",
    fontStyle: "italic",
  },

  articleContent: {
    width: "100%",
  },

  section: {
    marginBottom: 30,
  },

  sectionHeading: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "800",
    color: "#5B3716",
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 17,
    lineHeight: 29,
    fontWeight: "400",
    color: "#2F2924",
    marginBottom: 14,
  },

  noteBox: {
    backgroundColor: "#EEE8DD",
    borderRadius: 12,
    padding: 17,
    marginTop: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#D6C8B6",
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#5B3716",
    marginBottom: 8,
  },

  noteText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#51463C",
  },

  referencesBox: {
    marginTop: 10,
    marginBottom: 25,
  },

  referencesTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#5B3716",
    marginBottom: 12,
  },

  reference: {
    fontSize: 14,
    lineHeight: 23,
    color: "#5A514A",
    marginBottom: 7,
  },

  tagsContainer: {
    marginTop: 5,
    marginBottom: 20,
  },

  tagsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#5B3716",
    marginBottom: 12,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#E4D4B8",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5B3716",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#F5F1E8",
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1D0202",
    marginBottom: 10,
  },

  errorText: {
    fontSize: 16,
    color: "#6B625A",
    marginBottom: 25,
    textAlign: "center",
  },

  backButton: {
    backgroundColor: "#6B4520",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 40,
  },
});